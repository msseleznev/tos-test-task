import React from 'react';

import cat from './cat.png';
import s from './Error404.module.scss';

export const Error404: React.FC = () => {
  return (
    <div className={s.box}>
      <div>
        <div className={s.child_box1}>404</div>
        <div className={s.child_box2}>Упс! Страница не найдена</div>
        <div className={s.child_box2}>—ฅ/ᐠ.̫ .ᐟ\ฅ—</div>
      </div>
      <img src={cat} alt={cat} />
    </div>
  );
};
