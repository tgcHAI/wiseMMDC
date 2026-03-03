const admin = require('firebase-admin');

const DEFAULT_PROJECT_ID = 'wisemmdc-webtech-group5';

function parseServiceAccountFromEnv() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    const raw = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8');
    return JSON.parse(raw);
  }

  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    return {
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
  }

  return null;
}

function getBucketCandidates(projectId) {
  const envBucket = process.env.FIREBASE_STORAGE_BUCKET;
  const id = projectId || DEFAULT_PROJECT_ID;
  const candidates = [
    envBucket,
    `${id}.firebasestorage.app`,
    `${id}.appspot.com`,
  ].filter(Boolean);

  return [...new Set(candidates)];
}

let firebaseEnabled = false;
let bucketCandidates = [];

try {
  const serviceAccount = parseServiceAccountFromEnv();
  const projectId = process.env.FIREBASE_PROJECT_ID || serviceAccount?.project_id || DEFAULT_PROJECT_ID;
  bucketCandidates = getBucketCandidates(projectId);

  if (serviceAccount && bucketCandidates.length > 0) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: bucketCandidates[0],
      });
    }

    firebaseEnabled = true;
  }
} catch (error) {
  firebaseEnabled = false;
}

async function uploadBufferToFirebase({ buffer, destination, contentType }) {
  if (!firebaseEnabled || bucketCandidates.length === 0) {
    throw new Error('Firebase Storage is not configured.');
  }

  let lastError = null;

  for (const bucketName of bucketCandidates) {
    try {
      const bucket = admin.storage().bucket(bucketName);
      const file = bucket.file(destination);

      await file.save(buffer, {
        resumable: false,
        metadata: {
          contentType,
        },
      });

      const [signedUrl] = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });

      return signedUrl;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Firebase upload failed.');
}

module.exports = {
  firebaseEnabled,
  uploadBufferToFirebase,
};
