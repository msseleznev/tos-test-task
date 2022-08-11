import React, { useState } from 'react';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ContactType } from '../../../../types/types';
import { ModalForActions } from '../../../common/ModalForActions/ModalForActions';

import style from './Contact.module.scss';

type PackPropsType = {
  data: ContactType;
};

export const Contact: React.FC<PackPropsType> = ({ data }) => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalMod, setModalMod] = useState<'delete' | 'edit'>('delete');

  const modalModHandler = (mod: 'delete' | 'edit'): void => {
    if (mod !== 'delete') {
      setModalMod(mod);
      setModalActive(true);
    } else {
      setModalMod(mod);
      setModalActive(true);
    }
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
      <ModalForActions
        modalActive={modalActive}
        setModalActive={setModalActive}
        modalMod={modalMod}
        contactData={data}
      />
    </>
  );
};
