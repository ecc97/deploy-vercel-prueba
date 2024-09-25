export const uploadImageToCloudinary = async (file: File, index: number, images: string[]): Promise<string[]> => {
    const cloudName = "djb038x4m";
    const presetName = "upload_img";
  
    const formDataImg = new FormData();
    formDataImg.append('file', file);
    formDataImg.append('upload_preset', presetName);
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formDataImg,
      });
  
      const data = await response.json();
      const imageUrl = data.secure_url;
  
      const newImages = [...images]; // Usar las imágenes existentes
      newImages[index] = imageUrl; // Actualizar la imagen en el índice correspondiente
  
      return newImages; // Retornar el nuevo array de imágenes
  
    } catch (error) {
      console.error('Error uploading image:', error);
      return images; // Retornar las imágenes originales en caso de error
    }
  };