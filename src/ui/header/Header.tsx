import React from 'react';

import { initializeApp } from '../../bll/app/app-reducer';
import { useAppDispatch, useAppSelector } from '../../bll/hooks/hooks';
import { Skeleton } from '../common/Skeleton/Skeleton';

import style from './Header.module.scss';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAppFetching = useAppSelector(state => state.app.isAppFetching);
  const onLogoutClickHandler = (): void => {
    localStorage.clear();
    dispatch(initializeApp());
  };

  return (
    <div className={style.headerWrapper}>
      {isAppFetching && <Skeleton />}
      <input
        className={style.button}
        type="button"
        value="Logout"
        onClick={onLogoutClickHandler}
      />
    </div>
  );
};
