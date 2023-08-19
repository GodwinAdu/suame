
import { Outlet, Navigate } from 'react-router-dom';
import { isUserAuthenticated } from './utils/auth';


const PrivateRoutes = () => {
  // Replace this with your actual authentication logic
  const isAuthenticated = isUserAuthenticated();
console.log(isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
