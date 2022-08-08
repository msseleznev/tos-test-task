import React, { useEffect } from 'react';

import { getContactsTC } from '../../../bll/contacts/contacts-reducer';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Search } from '../../common/Search/Search';
import { Skeleton } from '../../common/Skeleton/Skeleton';
import { SortItem } from '../../common/SortItem/SortItem';

import { Contact } from './Contact/Contact';
import style from './Contacts.module.scss';

export const Contacts: React.FC = () => {
  const contacts = useAppSelector(state => state.contacts.contacts);
  const isAppFetching = useAppSelector(state => state.app.isAppFetching);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContactsTC());
  }, []);

  return (
    <div className={style.content}>
      <div className={style.inputBlock}>
        <Search />
        <input className={style.button} type="submit" value="Add contact" />
      </div>

      <div className={style.tableBlock}>
        {isAppFetching && <Skeleton />}
        <table>
          <thead>
            <tr>
              <th className={style.nameColum}>
                <SortItem title="Name" />
              </th>
              <th className={style.phoneColum}>
                <SortItem title="Phone number" />
              </th>
              <th className={style.descriptionColum}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <Contact key={c.id} data={c} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
