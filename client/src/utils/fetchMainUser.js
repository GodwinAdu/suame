import jwt_decode from 'jwt-decode';
import { isTokenValid } from './checkingToken';

export const fetchUser = () => {
    if (!isTokenValid()) {
        return null; // No token or token is invalid
    }

    // Get the JWT token from localStorage
    const userInfo = localStorage.getItem('token');

    // Decode the JWT token using jwt-decode
    const decodedToken = jwt_decode(userInfo);

    // Return the decoded user information
    return decodedToken;
};


