import React from 'react';

import s from './Modal.module.scss';

type ModalPropsType = {
  active: boolean;
  setActive: (setModalActive: boolean) => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalPropsType> = ({ active, setActive, children }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className={active ? `${s.modal} ${s.active}` : s.modal}
      onClick={() => setActive(false)}
      onKeyDown={() => setActive(false)}
    >
      <div
        role="button"
        tabIndex={0}
        className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
