import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Contacts } from '../pages/Contacts/Contacts';
import { Error404 } from '../pages/Error/Error404Page';
import { Login } from '../pages/Login/Login';

export const PATH = {
  LOGIN: '/login',
  CONTACTS: '/contacts',
};

export const RoutesApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PATH.LOGIN} />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.CONTACTS} element={<Contacts />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
