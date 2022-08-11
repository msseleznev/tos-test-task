import React, { useState } from 'react';

import { deleteContactTC, editContactTC } from '../../../bll/contacts/contacts-reducer';
import { useAppDispatch } from '../../../bll/hooks/hooks';
import { ContactType } from '../../../types/types';
import { Button } from '../Button/Button';
import { InputText } from '../InputText/InputText';
import Modal from '../Modal/Modal';

type ModalForActionsType = {
  modalActive: boolean;
  setModalActive: (setModalActive: boolean) => void;
  modalMod: 'delete' | 'edit';
  contactData: ContactType;
};

export const ModalForActions: React.FC<ModalForActionsType> = ({
  setModalActive,
  modalActive,
  contactData,
  modalMod,
}) => {
  const dispatch = useAppDispatch();
  const [newContactName, setNewContactName] = useState(contactData.name);
  const [newContactPhone, setNewContactPhone] = useState(contactData.phone);
  const deleteContact = (): void => {
    dispatch(deleteContactTC(contactData.id));
    setModalActive(false);
  };

  const editContact = (): void => {
    if (contactData.name !== newContactName || contactData.phone !== newContactPhone) {
      dispatch(
        editContactTC({
          id: contactData.id,
          name: newContactName,
          phone: newContactPhone,
        }),
      );
    }
    setModalActive(false);
  };

  return (
    <Modal active={modalActive} setActive={setModalActive}>
      {modalMod === 'delete' ? (
        <>
          <h3>Delete contact &lsquo;{contactData.name}&lsquo;?</h3>
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
  );
};
