import React, { useState } from 'react';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  deleteContactTC,
  editContactTC,
} from '../../../../bll/contacts/contacts-reducer';
import { useAppDispatch } from '../../../../bll/hooks/hooks';
import { ContactType } from '../../../../types/types';
import { Button } from '../../../common/Button/Button';
import { InputText } from '../../../common/InputText/InputText';
import Modal from '../../../common/Modal/Modal';

import style from './Contact.module.scss';

type PackPropsType = {
  data: ContactType;
};

export const Contact: React.FC<PackPropsType> = ({ data }) => {
  const dispatch = useAppDispatch();

  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalMod, setModalMod] = useState<'delete' | 'edit'>('delete');
  const [newContactName, setNewContactName] = useState(data.name);
  const [newContactPhone, setNewContactPhone] = useState(data.phone);
  const modalModHandler = (mod: 'delete' | 'edit'): void => {
    if (mod !== 'delete') {
      setModalMod(mod);
      setModalActive(true);
    } else {
      setModalMod(mod);
      setModalActive(true);
    }
  };
  const deleteContact = (): void => {
    dispatch(deleteContactTC(data.id));
    setModalActive(false);
  };

  const editContact = (): void => {
    if (data.name !== newContactName || data.phone !== newContactPhone) {
      dispatch(
        editContactTC({ id: data.id, name: newContactName, phone: newContactPhone }),
      );
    }
    setModalActive(false);
  };

  return (
    <>
      <tr>
        <td className={style.idRow}>{data.name}</td>
        <td>{data.phone}</td>
        <td className={style.actions}>
          <FontAwesomeIcon
            icon={faPencil}
            size="lg"
            className={style.iconEdit}
            onClick={() => modalModHandler('edit')}
          />
          <FontAwesomeIcon
            icon={faTrashCan}
            size="lg"
            className={style.iconDelete}
            onClick={() => modalModHandler('delete')}
          />
        </td>
      </tr>
      <Modal active={modalActive} setActive={setModalActive}>
        {modalMod === 'delete' ? (
          <>
            <h3>Delete contact &lsquo;{data.name}&lsquo;?</h3>
            <div style={{ display: 'flex' }}>
              <Button style={{ margin: 10 }} red onClick={deleteContact}>
                Yes
              </Button>
              <Button
                style={{ margin: 10 }}
                green
                onClick={() => {
                  setModalActive(false);
                }}
              >
                No
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3>Name</h3>
            <InputText value={newContactName} onChangeText={setNewContactName} />
            <h3>Phone number</h3>
            <InputText value={newContactPhone} onChangeText={setNewContactPhone} />
            <Button style={{ marginTop: 20 }} onClick={editContact}>
              Edit
            </Button>
          </>
        )}
      </Modal>
    </>
  );
};
