export const isUserAuthenticated = () => {
    // Get the user details from localStorage
    const userInfo = localStorage?.getItem('token');
  
    // Check if user details exist and return true if they do
    return !!userInfo;
  };
  