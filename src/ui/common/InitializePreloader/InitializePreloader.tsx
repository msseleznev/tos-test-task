import React from 'react';

import style from './InitializePreloader.module.scss';

export const InitializePreloader: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.balls}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
