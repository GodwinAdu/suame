
// Function to convert an image to base64
export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result); // Resolve with the base64 data
    };

    reader.onerror = (error) => {
      reject(error); // Reject if there's an error
    };

    reader.readAsDataURL(file); // Start reading the file as data URL
  });
};