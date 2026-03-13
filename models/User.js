const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  fileName: String,
  fileUrl: String,
  storageProvider: { type: String, enum: ['supabase', 'local-demo'], default: 'local-demo' },
  storagePath: String,
  contentType: String,
  uploadDate: { type: Date, default: Date.now },
}, { collection: 'uploads' });

module.exports = mongoose.model('User', userSchema);
