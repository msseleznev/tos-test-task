import React, { useEffect, useState } from 'react';

import { v1 } from 'uuid';

import { createContactTC, getContactsTC } from '../../../bll/contacts/contacts-reducer';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Button } from '../../common/Button/Button';
import { InputText } from '../../common/InputText/InputText';
import Modal from '../../common/Modal/Modal';
import { Search } from '../../common/Search/Search';
import { Skeleton } from '../../common/Skeleton/Skeleton';
import { SortItem } from '../../common/SortItem/SortItem';

import { Contact } from './Contact/Contact';
import style from './Contacts.module.scss';

export const Contacts: React.FC = () => {
  const contacts = useAppSelector(state => state.contacts.contacts);
  const isAppFetching = useAppSelector(state => state.app.isAppFetching);
  const dispatch = useAppDispatch();

  const [modalActive, setModalActive] = useState<boolean>(false);
  const [contactId, setContactId] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const createPackHandler = (): void => {
    if (!!contactName && !!contactPhone) {
      dispatch(
        createContactTC({ id: contactId, name: contactName, phone: contactPhone }),
      );
    }
    setContactName('');
    setContactPhone('');
    setModalActive(false);
  };

  const addContactHandler = (): void => {
    setModalActive(true);
    setContactId(v1());
  };

  useEffect(() => {
    dispatch(getContactsTC());
  }, []);

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
      <Modal active={modalActive} setActive={setModalActive}>
        <h3>Name</h3>
        <InputText value={contactName} onChangeText={setContactName} />
        <h3>Phone number</h3>
        <InputText value={contactPhone} onChangeText={setContactPhone} />
        <Button style={{ marginTop: 20 }} onClick={createPackHandler}>
          Create contact
        </Button>
      </Modal>
    </div>
  );
};
