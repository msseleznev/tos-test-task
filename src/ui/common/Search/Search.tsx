import React, { ChangeEvent, useState } from 'react';

import { useDebounce } from '../../../hooks/hooks';

import style from './Search.module.scss';

const DEBOUNCE_SEARCH_TIMER = 400;

export const Search: React.FC = () => {
  // const dispatch = useAppDispatch();

  const [searchingValue, setSearchingValue] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const innerDebounceCallback = (value: string): void => {
    // dispatch(Search({ searchValue: value }));
  };

  const debouncedSearch = useDebounce(innerDebounceCallback, DEBOUNCE_SEARCH_TIMER);
  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;

    setSearchingValue(e.currentTarget.value);
    debouncedSearch(value);
    if (value === '') {
      //
    }
  };

  return (
    <div className={style.searchBlock}>
      <input
        placeholder="Поиск"
        className={style.input}
        value={searchingValue}
        onChange={onSearchHandler}
      />
      <div className={style.icon} />
    </div>
  );
};
