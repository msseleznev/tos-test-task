import React, { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';
import { v1 } from 'uuid';

import { getContactsTC } from '../../../bll/contacts/contacts-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/hooks/hooks';
import { ModalForAddContact } from '../../common/ModalForAddContact/ModalForAddContact';
import { Search } from '../../common/Search/Search';
import { Skeleton } from '../../common/Skeleton/Skeleton';
import { SortItem } from '../../common/SortItem/SortItem';
import { PATH } from '../../routes/RoutesApp';

import { Contact } from './Contact/Contact';
import style from './Contacts.module.scss';

export const Contacts: React.FC = () => {
  const contacts = useAppSelector(state => state.contacts.contactsForRender);
  const isAppFetching = useAppSelector(state => state.app.isAppFetching);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const isNotFound = useAppSelector(state => state.contacts.isNotFound);
  const dispatch = useAppDispatch();

  const [modalActive, setModalActive] = useState<boolean>(false);
  const [contactId, setContactId] = useState('');

  const addContactHandler = (): void => {
    setModalActive(true);
    setContactId(v1());
  };

  useEffect(() => {
    dispatch(getContactsTC());
  }, []);
  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={style.content}>
      <div className={style.inputBlock}>
        <Search />
        <input
          className={style.button}
          type="button"
          value="Add contact"
          onClick={addContactHandler}
        />
      </div>

      <div className={style.tableBlock}>
        {isAppFetching && <Skeleton />}
        <table>
          <thead>
            <tr>
              <th className={style.nameColum}>
                <SortItem title="Name" sortOptions="name" />
              </th>
              <th className={style.phoneColum}>
                <SortItem title="Phone number" sortOptions="phone" />
              </th>
              <th className={style.descriptionColum}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isNotFound ? (
              <h3>Nothing found for your search</h3>
            ) : (
              contacts.map(c => <Contact key={c.id} data={c} />)
            )}
          </tbody>
        </table>
      </div>
      <ModalForAddContact
        modalActive={modalActive}
        setModalActive={setModalActive}
        contactId={contactId}
      />
    </div>
  );
};
