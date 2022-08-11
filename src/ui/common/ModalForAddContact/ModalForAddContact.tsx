import React, { useState } from 'react';

import { createContactTC } from '../../../bll/contacts/contacts-reducer';
import { useAppDispatch } from '../../../bll/hooks/hooks';
import { Button } from '../Button/Button';
import { InputText } from '../InputText/InputText';
import Modal from '../Modal/Modal';

type ModalForAddContactType = {
  modalActive: boolean;
  setModalActive: (setModalActive: boolean) => void;
  contactId: string;
};

export const ModalForAddContact: React.FC<ModalForAddContactType> = ({
  modalActive,
  setModalActive,
  contactId,
}) => {
  const dispatch = useAppDispatch();
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const createContactHandler = (): void => {
    if (!!contactName && !!contactPhone) {
      dispatch(
        createContactTC({ id: contactId, name: contactName, phone: contactPhone }),
      );
    }
    setContactName('');
    setContactPhone('');
    setModalActive(false);
  };

  return (
    <Modal active={modalActive} setActive={setModalActive}>
      <h3>Name</h3>
      <InputText value={contactName} onChangeText={setContactName} />
      <h3>Phone number</h3>
      <InputText value={contactPhone} onChangeText={setContactPhone} />
      <Button style={{ marginTop: 20 }} onClick={createContactHandler}>
        Create contact
      </Button>
    </Modal>
  );
};
