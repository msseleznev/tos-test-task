import React from 'react';

import { useAppSelector } from '../../../hooks/hooks';
import { Search } from '../../common/Search/Search';
import { SortItem } from '../../common/SortItem/SortItem';

import { Contact } from './Contact/Contact';
import style from './Contacts.module.scss';

export const Contacts: React.FC = () => {
  const contacts = useAppSelector(state => state.contacts.contacts);

  return (
    <div className={style.content}>
      <div className={style.inputBlock}>
        <Search />
        <input className={style.button} type="submit" value="Add contact" />
      </div>

      <div className={style.tableBlock}>
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
