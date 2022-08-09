import React, { ChangeEvent, useState } from 'react';

import { searchContactTC } from '../../../bll/contacts/contacts-reducer';
import { useAppDispatch, useDebounce } from '../../../bll/hooks/hooks';

import style from './Search.module.scss';

const DEBOUNCE_SEARCH_TIMER = 400;

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();

  const [searchingValue, setSearchingValue] = useState<string>('');

  const innerDebounceCallback = (value: string): void => {
    dispatch(searchContactTC(value));
  };

  const debouncedSearch = useDebounce(innerDebounceCallback, DEBOUNCE_SEARCH_TIMER);
  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;

    setSearchingValue(e.currentTarget.value);
    debouncedSearch(value);
  };

  return (
    <div className={style.searchBlock}>
      <input
        placeholder="Search name.."
        className={style.input}
        value={searchingValue}
        onChange={onSearchHandler}
      />
      <div className={style.icon} />
    </div>
  );
};
