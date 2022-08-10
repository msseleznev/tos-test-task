import React from 'react';

import { initializeApp } from '../../bll/app/app-reducer';
import { useAppDispatch } from '../../bll/hooks/hooks';

import style from './Header.module.scss';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const onLogoutClickHandler = (): void => {
    localStorage.clear();
    dispatch(initializeApp());
  };

  return (
    <div className={style.headerWrapper}>
      <input
        className={style.button}
        type="button"
        value="Logout"
        onClick={onLogoutClickHandler}
      />
    </div>
  );
};
