import React, { useState } from 'react';

import style from './SortItem.module.scss';

type SortItemType = {
  title: string;
};

export const SortItem: React.FC<SortItemType> = ({ title }) => {
  const [sortOrder, setSortOrder] = useState('down');
  const sort = (): void => {
    if (sortOrder === 'down') {
      setSortOrder('up');
    }
    if (sortOrder === 'up') {
      setSortOrder('down');
    }
    // dispatch(setSorting({ sortOrder, sortOptions }));
  };

  const styleToggle =
    sortOrder === 'up' ? `${style.iconUp} ${style.iconDown}` : style.iconDown;

  return (
    <div
      className={style.header}
      onClick={sort}
      onKeyDown={sort}
      role="button"
      tabIndex={0}
    >
      {title}
      <div className={styleToggle} />
    </div>
  );
};
