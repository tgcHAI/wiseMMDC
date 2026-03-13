const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseStorageBucket = process.env.SUPABASE_STORAGE_BUCKET;

let supabaseEnabled = false;
let supabaseClient = null;

try {
  if (supabaseUrl && supabaseServiceRoleKey && supabaseStorageBucket) {
    supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    supabaseEnabled = true;
  }
} catch (_error) {
  supabaseEnabled = false;
}

async function uploadBufferToSupabase({ buffer, destination, contentType }) {
  if (!supabaseEnabled || !supabaseClient) {
    throw new Error('Supabase Storage is not configured.');
  }

  const uploadResult = await supabaseClient
    .storage
    .from(supabaseStorageBucket)
    .upload(destination, buffer, {
      upsert: false,
      contentType,
    });

  if (uploadResult.error) {
    throw uploadResult.error;
  }

  const signedUrlResult = await supabaseClient
    .storage
    .from(supabaseStorageBucket)
    .createSignedUrl(destination, 60 * 60 * 24 * 365 * 10);

  if (!signedUrlResult.error && signedUrlResult.data?.signedUrl) {
    return signedUrlResult.data.signedUrl;
  }

  const publicUrlResult = supabaseClient
    .storage
    .from(supabaseStorageBucket)
    .getPublicUrl(destination);

  if (publicUrlResult.data?.publicUrl) {
    return publicUrlResult.data.publicUrl;
  }

  throw new Error('Supabase upload succeeded, but no file URL could be generated.');
}

async function objectExistsInSupabase(objectPath) {
  if (!supabaseEnabled || !supabaseClient || !objectPath) {
    return false;
  }

  const normalizedPath = String(objectPath).replace(/^\/+/, '');
  const signedUrlResult = await supabaseClient
    .storage
    .from(supabaseStorageBucket)
    .createSignedUrl(normalizedPath, 60);

  if (signedUrlResult.error) {
    const message = String(signedUrlResult.error.message || '').toLowerCase();
    const statusCode = Number(signedUrlResult.error.statusCode || 0);

    if (
      statusCode === 404 ||
      message.includes('not found') ||
      message.includes('does not exist')
    ) {
      return false;
    }

    throw signedUrlResult.error;
  }

  return Boolean(signedUrlResult.data?.signedUrl);
}

async function deleteObjectFromSupabase(objectPath) {
  if (!supabaseEnabled || !supabaseClient || !objectPath) {
    return;
  }

  const normalizedPath = String(objectPath).replace(/^\/+/, '');
  const removeResult = await supabaseClient
    .storage
    .from(supabaseStorageBucket)
    .remove([normalizedPath]);

  if (removeResult.error) {
    throw removeResult.error;
  }
}

async function listObjectsInSupabase(prefix = 'uploads') {
  if (!supabaseEnabled || !supabaseClient) {
    return [];
  }

  const normalizedPrefix = String(prefix || '').replace(/^\/+|\/+$/g, '');
  const listPath = normalizedPrefix.includes('/')
    ? normalizedPrefix.slice(0, normalizedPrefix.lastIndexOf('/'))
    : normalizedPrefix;
  const expectedPrefix = normalizedPrefix ? `${normalizedPrefix}/` : '';
  const collectedPaths = [];
  const pageSize = 100;
  let offset = 0;

  while (true) {
    const listResult = await supabaseClient
      .storage
      .from(supabaseStorageBucket)
      .list(listPath, {
        limit: pageSize,
        offset,
      });

    if (listResult.error) {
      throw listResult.error;
    }

    const items = listResult.data || [];
    const filePaths = items
      .filter((item) => item && item.name && !item.id?.endsWith('/'))
      .map((item) => (listPath ? `${listPath}/${item.name}` : item.name))
      .filter((path) => !expectedPrefix || path.startsWith(expectedPrefix));

    collectedPaths.push(...filePaths);

    if (items.length < pageSize) {
      break;
    }

    offset += pageSize;
  }

  return collectedPaths;
}

module.exports = {
  supabaseEnabled,
  uploadBufferToSupabase,
  objectExistsInSupabase,
  deleteObjectFromSupabase,
  listObjectsInSupabase,
};
