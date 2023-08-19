export const isTokenValid = () => {
    // Check if the token key exists in localStorage
    const token = localStorage.getItem('token');
    
    // If token is null or undefined, it doesn't exist
    if (token === null || token === undefined) {
        return false;
    }
    
    // Token key exists, but check if its value is 'null'
    if (token === 'null') {
        return false;
    }
    
    // Token key exists and has a non-null value
    return true;
};
