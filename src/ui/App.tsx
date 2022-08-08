import React from 'react';

import style from './App.module.scss';
import { InitializePreloader } from './common/InitializePreloader/InitializePreloader';
import { SnackBar, SNACK_BAR_TYPES } from './common/SnackBar/SnackBar';
import { Header } from './header/Header';
import { RoutesApp } from './routes/RoutesApp';

import { useAppSelector } from 'hooks/hooks';

const App: React.FC = () => {
  const { appIsInitialize, appError, appMessage } = useAppSelector(state => state.app);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  if (!appIsInitialize) {
    return <InitializePreloader />;
  }

  return (
    <div className={style.appBlock}>
      {isLoggedIn && <Header />}
      <RoutesApp />
      {appError && <SnackBar message={appError} type={SNACK_BAR_TYPES.ERROR} />}
      {appMessage && <SnackBar message={appMessage} type={SNACK_BAR_TYPES.SUCCESS} />}
    </div>
  );
};

export default App;
