import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ isLoggedIn, children }) {
    console.log("inner private route login",isLoggedIn)
  return isLoggedIn ? children : <Navigate to="/admin" />;
}