const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
}));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
  secret: 'wiseMMDC-session-secret-2026',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Passport setup 
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (_accessToken, _refreshToken, profile, done) => done(null, profile)
  ));
} else {
  console.warn('Google OAuth credentials are missing in .env (GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET).');
}

// ===== SECURITY MIDDLEWARE =====
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function getUserRoleByEmail(email) {
  if (!email) return 'user';
  return ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'user';
}

// TOKEN VALIDATION 
async function validateGoogleToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    req.user = ticket.getPayload();
    // Role assignment 
    req.user.role = getUserRoleByEmail(req.user.email);
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
}

async function authenticateSessionOrToken(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated() && req.user) {
    const email = req.user?.emails?.[0]?.value || req.user?.email;
    req.user = {
      ...req.user,
      email,
      role: getUserRoleByEmail(email),
    };
    return next();
  }

  return validateGoogleToken(req, res, next);
}

// RBAC MIDDLEWARE 
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        error: `Forbidden. You: ${userRole}. Required: ${allowedRoles.join(', ')}` 
      });
    }
    next();
  };
}

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Input validation failed',
      details: errors.array().map((entry) => ({
        field: entry.path,
        message: entry.msg,
      })),
    });
  }
  next();
}

// ===== GOOGLE TOKEN LOGIN  =====
app.post('/google-login',
  [
    body('token')
      .isString()
      .notEmpty()
      .withMessage('Google token is required'),
  ],
  handleValidationErrors,
  async (req, res) => {
  const { token } = req.body;
  
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const role = getUserRoleByEmail(payload.email);
    
    // Generate JWT token
    const jwtToken = jwt.sign(
      { email: payload.email, role }, 
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token: jwtToken, 
      user: { email: payload.email, role },
      message: 'Login successful!'
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid Google token' });
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.log(' MongoDB Error:', err));

// ===== CALCULATOR ROUTES =====
const Calc = require('./models/Calc');
app.post('/api/calc', async (req, res) => {
  try {
    const { campusTotal, onlineTotal } = req.body;
    const calc = new Calc({ campusTotal, onlineTotal });
    await calc.save();
    res.status(201).json(calc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save calculation' });
  }
});
app.get('/api/calcs', async (req, res) => {
  try {
    const calcs = await Calc.find().sort({ date: -1 }).limit(3);
    res.json(calcs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch calculations' });
  }
});

// ===== SECURE FILE ROUTES  =====
const {
  supabaseEnabled,
  uploadBufferToSupabase,
  objectExistsInSupabase,
  deleteObjectFromSupabase,
  listObjectsInSupabase,
} = require('./config/supabase');
const User = require('./models/User');
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ALLOWED_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    const extension = path.extname(file.originalname || '').toLowerCase();
    const isAllowedType = ALLOWED_FILE_TYPES.includes(file.mimetype);
    const isAllowedExtension = ALLOWED_FILE_EXTENSIONS.includes(extension);

    if (!isAllowedType || !isAllowedExtension) {
      const error = new Error('Invalid file type. Allowed: JPG, PNG, PDF, DOC, DOCX.');
      error.status = 400;
      return cb(error);
    }
    cb(null, true);
  },
});

function extractSupabaseObjectPath(fileUrl) {
  if (!fileUrl || typeof fileUrl !== 'string') {
    return null;
  }

  try {
    const parsed = new URL(fileUrl);
    const pathname = parsed.pathname || '';
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || '';
    const publicMarker = `/storage/v1/object/public/${bucketName}/`;
    const signedMarker = `/storage/v1/object/sign/${bucketName}/`;

    if (pathname.includes(publicMarker)) {
      return decodeURIComponent(pathname.split(publicMarker)[1] || '');
    }

    if (pathname.includes(signedMarker)) {
      return decodeURIComponent(pathname.split(signedMarker)[1] || '');
    }
  } catch (_error) {
    return null;
  }

  return null;
}

function resolveStorageMetadata(doc) {
  const fileUrl = doc.fileUrl || '';

  if (fileUrl.startsWith('/uploads/')) {
    return {
      provider: 'local-demo',
      path: fileUrl.replace(/^\//, ''),
    };
  }

  const extractedPath = doc.storagePath || extractSupabaseObjectPath(fileUrl);
  if (extractedPath) {
    return {
      provider: 'supabase',
      path: extractedPath,
    };
  }

  return {
    provider: doc.storageProvider || 'local-demo',
    path: doc.storagePath || null,
  };
}

async function deleteStoredFile(doc) {
  const storage = resolveStorageMetadata(doc);

  if (storage.provider === 'local-demo') {
    const localRelativePath = storage.path || (doc.fileUrl || '').replace(/^\//, '');
    if (!localRelativePath) {
      return;
    }
    const localPath = path.join(__dirname, 'public', localRelativePath);
    await fs.promises.rm(localPath, { force: true });
    return;
  }

  if (storage.provider === 'supabase' && storage.path) {
    await deleteObjectFromSupabase(storage.path);
  }
}

async function cleanupOrphanedSupabaseFiles() {
  if (!supabaseEnabled) {
    return;
  }

  const allUploads = await User.find({}, 'fileUrl storageProvider storagePath').lean();
  const knownPaths = new Set();

  for (const doc of allUploads) {
    const storage = resolveStorageMetadata(doc);
    if (storage.provider === 'supabase' && storage.path) {
      knownPaths.add(storage.path);
    }
  }

  const storedPaths = await listObjectsInSupabase('uploads');
  const orphanedPaths = storedPaths.filter((storedPath) => !knownPaths.has(storedPath));

  if (orphanedPaths.length === 0) {
    return;
  }

  await Promise.all(orphanedPaths.map((storedPath) => deleteObjectFromSupabase(storedPath)));
}

app.get('/upload', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

// PROTECTED: File Upload (user + admin)
app.post('/upload', 
  authenticateSessionOrToken,
  authorizeRoles('user', 'admin'), 
  upload.single('file'), 
  [
    body('name')
      .optional({ values: 'falsy' })
      .trim()
      .isLength({ min: 2, max: 60 })
      .withMessage('Name must be 2-60 characters long'),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { name } = req.body;
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

      const safeFileName = req.file.originalname.replace(/\s+/g, '_');
      const objectKey = `uploads/${Date.now()}_${safeFileName}`;

      let fileUrl = '';
      let storageMode = 'local-demo';

      if (supabaseEnabled) {
        try {
          fileUrl = await uploadBufferToSupabase({
            buffer: req.file.buffer,
            destination: objectKey,
            contentType: req.file.mimetype,
          });
          storageMode = 'supabase';
        } catch (_supabaseError) {
          storageMode = 'local-demo';
        }
      }

      if (storageMode === 'local-demo') {
        const uploadDir = path.join(__dirname, 'public', 'uploads');
        await fs.promises.mkdir(uploadDir, { recursive: true });
        const localFileName = `${Date.now()}_${safeFileName}`;
        const localFilePath = path.join(uploadDir, localFileName);
        await fs.promises.writeFile(localFilePath, req.file.buffer);
        fileUrl = `/uploads/${localFileName}`;
      }

      const userDoc = new User({
        name: name || req.user.email.split('@')[0],
        email: req.user.email,
        fileName: req.file.originalname,
        fileUrl,
        storageProvider: storageMode,
        storagePath: storageMode === 'supabase' ? objectKey : fileUrl.replace(/^\//, ''),
        contentType: req.file.mimetype,
      });

      await userDoc.save();
      res.json({
        message: `File uploaded successfully  `,
        user: userDoc,
      });
    } catch (error) {
      next(error);
    }
  }
);

// PROTECTED: All Files (admin only)
async function listUploadsHandler(req, res, next) {
  try {
    await cleanupOrphanedSupabaseFiles();
    const uploads = await User.find().sort({ uploadDate: -1 });
    const visibleUploads = await filterExistingUploads(uploads);
    res.json({
      message: `Admin view - ${visibleUploads.length} files`,
      users: visibleUploads,
    });
  } catch (error) {
    next(error);
  }
}

async function filterExistingUploads(uploadDocs) {
  const staleIds = [];
  const visible = [];

  for (const doc of uploadDocs) {
    const storage = resolveStorageMetadata(doc);

    if (storage.provider === 'local-demo') {
      const localRelativePath = storage.path || (doc.fileUrl || '').replace(/^\//, '');
      const localPath = path.join(__dirname, 'public', localRelativePath);
      try {
        await fs.promises.access(localPath);
        if (doc.storageProvider !== 'local-demo' || doc.storagePath !== localRelativePath) {
          doc.storageProvider = 'local-demo';
          doc.storagePath = localRelativePath;
          await doc.save();
        }
        visible.push(doc);
      } catch (_error) {
        staleIds.push(doc._id);
      }
      continue;
    }

    if (storage.provider === 'supabase' && storage.path) {
      if (!supabaseEnabled) {
        visible.push(doc);
        continue;
      }

      try {
        const exists = await objectExistsInSupabase(storage.path);
        if (exists) {
          if (doc.storageProvider !== 'supabase' || doc.storagePath !== storage.path) {
            doc.storageProvider = 'supabase';
            doc.storagePath = storage.path;
            await doc.save();
          }
          visible.push(doc);
        } else {
          staleIds.push(doc._id);
        }
      } catch (_error) {
        visible.push(doc);
      }
      continue;
    }

    visible.push(doc);
  }

  if (staleIds.length > 0) {
    await User.deleteMany({ _id: { $in: staleIds } });
  }

  return visible;
}

app.get('/my-uploads',
  authenticateSessionOrToken,
  authorizeRoles('user', 'admin'),
  async (req, res, next) => {
    try {
      await cleanupOrphanedSupabaseFiles();
      const query = req.user.role === 'admin' ? {} : { email: req.user.email };
      const uploads = await User.find(query).sort({ uploadDate: -1 });
      const visibleUploads = await filterExistingUploads(uploads);
      return res.json({
        message: req.user.role === 'admin'
          ? `Admin view - ${visibleUploads.length} files`
          : `User view - ${visibleUploads.length} files`,
        users: visibleUploads,
      });
    } catch (error) {
      next(error);
    }
  }
);

app.delete('/uploads/:id',
  authenticateSessionOrToken,
  authorizeRoles('user', 'admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid file id.' });
      }

      const uploadDoc = await User.findById(id);
      if (!uploadDoc) {
        return res.status(404).json({ error: 'File record not found.' });
      }

      const isOwner = uploadDoc.email === req.user.email;
      if (req.user.role !== 'admin' && !isOwner) {
        return res.status(403).json({ error: 'Forbidden. You can only delete your own files.' });
      }

      try {
        await deleteStoredFile(uploadDoc);
      } catch (_storageError) {
        // Continue deletion of stale metadata if file is already missing.
      }

      await User.deleteOne({ _id: uploadDoc._id });

      return res.json({
        message: 'File deleted successfully.',
        deletedId: String(uploadDoc._id),
      });
    } catch (error) {
      next(error);
    }
  }
);

app.get('/uploads',
  authenticateSessionOrToken,
  authorizeRoles('admin'),
  listUploadsHandler
);

app.get('/users',
  authenticateSessionOrToken,
  authorizeRoles('admin'),
  listUploadsHandler
);

//  Profile (user + admin)
app.get('/profile', authenticateSessionOrToken, authorizeRoles('user', 'admin'), (req, res) => {
  const accountName =
    req.user?.displayName ||
    req.user?.name?.givenName ||
    req.user?.given_name ||
    req.user?.name ||
    req.user?.email?.split('@')[0] ||
    'Student';

  const payload = {
    message: `Hi, Student ${accountName}!`,
    permissions: req.user.role === 'admin' ? 'Full access' : 'User access'
  };

  const accepts = req.get('accept') || '';
  const wantsJson = req.query.format === 'json' || (accepts.includes('application/json') && !accepts.includes('text/html'));

  if (wantsJson) {
    return res.json(payload);
  }

  try {
    const profileTemplatePath = path.join(__dirname, 'public', 'profile.html');
    const template = fs.readFileSync(profileTemplatePath, 'utf8');
    const html = template
      .replaceAll('{{PROFILE_MESSAGE}}', payload.message)
      .replaceAll('{{PROFILE_PERMISSIONS}}', payload.permissions);
    return res.send(html);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to render profile page' });
  }
});


// Auth status for frontend
app.get('/auth/status', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.json({ authenticated: false });
  }
  const email = req.user?.emails?.[0]?.value || req.user?.email;
  const role = getUserRoleByEmail(email);
  res.json({
    authenticated: true,
    displayName: req.user.displayName || req.user.name?.givenName || 'Student',
    email,
    role,
  });
});

// OAuth routes 
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log(' OAuth Login:', req.user.displayName);
    res.redirect('/');
  }
);
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send('Logout error');
    res.redirect('/');
  });
});

// Homepage 
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html><head><title>WiseMMDC</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    </head><body class="bg-primary text-white p-5">
      <div class="container text-center">
        <h1> WiseMMDC Enterprise Edition</h1>
        <p>Token Auth + RBAC + Supabase + Calculator</p>
        <div class="mt-4">
          <a href="/auth/google" class="btn btn-light btn-lg me-3"> OAuth Login</a>
          <a href="/upload" class="btn btn-outline-light btn-lg me-3">Upload Page</a>
          <span>OR use Token Auth → POST /google-login</span>
        </div>
      </div>
    </body></html>
  `);
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: `File too large. Max size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` });
    }
    return res.status(400).json({ error: err.message || 'Upload validation error' });
  }

  const statusCode = err.status || err.statusCode || 500;
  const shouldExposeMessage = Boolean(err.expose) || statusCode < 500;
  const message = shouldExposeMessage ? err.message : 'Internal server error';
  return res.status(statusCode).json({ error: message });
});

app.listen(3000, () => {
  console.log(' Enterprise Server: http://localhost:3000');
  console.log(' OAuth: /auth/google');
  console.log(' Token Login: POST /google-login');
  console.log(' Protected: /upload, /users, /profile');
});


