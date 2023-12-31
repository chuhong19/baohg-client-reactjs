// import { Navigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import Spinner from 'react-bootstrap/Spinner';

// const ProtectedRoute = ({ children }) => {
//     const {
//         authState: { authLoading, isAuthenticated },
//     } = useContext(AuthContext);

//     if (authLoading)
//         return (
//             <div className='spinner-container'>
//                 <Spinner animation='border' variant='info' />
//             </div>
//         );
//     if (!isAuthenticated)
//        return <Navigate to='/login' />
//     return children;

// };

// export default ProtectedRoute;

import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import NavbarMenu from '../layout/NavbarMenu';

const ProtectedRoute = () => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  return isAuthenticated ? (
    <>
      <NavbarMenu />
      <Outlet />
    </>
  ) : (
    <Navigate to='/login' />
  );
};

export default ProtectedRoute;
