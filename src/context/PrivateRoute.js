import React,{ useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {useDataContext} from './DataContext'

const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem('current-token'); // トークンの有無を確認
  if (!token) {
      return <Navigate to="/" />;
  }
  return children;

};

export default PrivateRoute;

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useDataContext } from './DataContext';

// const PrivateRoute = ({ children }) => {
//   onst { isAuthenticated } = useDataContext();

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;
