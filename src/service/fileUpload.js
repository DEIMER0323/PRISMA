const fileUpload = async (file) => {

    const cloudName = "dj3pprhnh";
  const uploadPreset = "prisma";

  
  const urlCloudinary = `CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dj3pprhnh`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("cloud_name", cloudName);

  try {
    const resp = await fetch(urlCloudinary, {
      method: "post",
      body: formData,
    });

    if (!resp.ok) return null;

    const data = await resp.json();
    return data.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export default fileUpload;