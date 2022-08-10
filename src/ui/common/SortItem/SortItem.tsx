import React, { useState } from 'react';

import { setSorting } from '../../../bll/contacts/contacts-reducer';
import { useAppDispatch } from '../../../bll/hooks/hooks';
import { SortOptionsType, SortOrderType } from '../../../types/types';

import style from './SortItem.module.scss';

type SortItemPropsType = {
  title: string;
  sortOptions: SortOptionsType;
};

export const SortItem: React.FC<SortItemPropsType> = ({ title, sortOptions }) => {
  const dispatch = useAppDispatch();
  const [sortOrder, setSortOrder] = useState<SortOrderType>('down');
  const sort = (): void => {
    if (sortOrder === 'down') {
      setSortOrder('up');
    }
    if (sortOrder === 'up') {
      setSortOrder('down');
    }
    dispatch(setSorting({ sortOptions, sortOrder }));
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
