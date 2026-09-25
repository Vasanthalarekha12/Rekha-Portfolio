export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'Rekha Portfolio');
  
  const response = await fetch('https://api.cloudinary.com/v1_1/gunezhyh/auto/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file to Cloudinary');
  }

  const data = await response.json();
  return {
    name: file.name,
    url: data.secure_url,
    publicId: data.public_id,
    resourceType: data.resource_type,
    format: data.format,
    folder: data.folder || '',
    createdAt: new Date().toISOString()
  };
};
