import React from 'react';

import style from './App.module.scss';
import { Header } from './header/Header';
import { RoutesApp } from './routes/RoutesApp';

const App: React.FC = () => {
  return (
    <div className={style.appBlock}>
      <Header />
      <RoutesApp />
    </div>
  );
};

export default App;
