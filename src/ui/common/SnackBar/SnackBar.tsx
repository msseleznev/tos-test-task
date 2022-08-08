import React, { useEffect, useRef, useState } from 'react';

import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

import { setAppError, setAppMessage } from '../../../bll/app/app-reducer';
import { NullableType } from '../../../bll/store';
import { useAppDispatch } from '../../../hooks/hooks';

import style from './SnackBar.module.scss';

export enum SNACK_BAR_TYPES {
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum MESSAGES_FOR_SUCCESS_BAR {
  NOTHING = '',
  LOGGED_IN_SUCCESSFULLY = 'Logged in successfully',
  NEW_CONTACT_SUCCESSFULLY_ADDED = 'New contact successfully added',
  CONTACT_CHANGED_SUCCESSFULLY = 'Contact changed successfully',
  CONTACT_SUCCESSFULLY_REMOVED = 'Contact successfully removed',
}

type ErrorBarPropsType = {
  message: string;
  type: SNACK_BAR_TYPES;
};

const TIMERS = {
  CLOSE_SNACK_BAR: 2000,
  CLEAR_APP_ERROR: 2200,
  CLOSE_ON_CLICK: 300,
};

export const SnackBar: React.FC<ErrorBarPropsType> = ({
  message,
  type,
}: ErrorBarPropsType) => {
  // property on which the display of the SnackBar depends
  const [isShowError, setIsShowError] = useState(false);
  const dispatch = useAppDispatch();
  const nodeRef = useRef(null);

  // synchronization appError and isShowError
  useEffect(() => {
    if (message) {
      setIsShowError(true);
    }
  }, [message]);

  // close SnackBar on click and clear appError after some time
  const closeTimerId = useRef<NullableType<ReturnType<typeof setTimeout>>>(null);
  const onCloseErrorBarHandler = (): void => {
    setIsShowError(false);
    closeTimerId.current = setTimeout(() => {
      if (type === SNACK_BAR_TYPES.ERROR) {
        dispatch(setAppError(''));
      }
      if (type === SNACK_BAR_TYPES.SUCCESS) {
        dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.NOTHING));
      }
    }, TIMERS.CLOSE_ON_CLICK);
  };

  // closing SnackBar after some time
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setIsShowError(false);
    }, TIMERS.CLOSE_SNACK_BAR);

    return () => {
      clearTimeout(timeoutID);
      clearTimeout(closeTimerId.current as ReturnType<typeof setTimeout>);
    };
  }, []);

  // clear appError after some time
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (type !== SNACK_BAR_TYPES.ERROR) {
        dispatch(setAppError(''));
      }
      if (type !== SNACK_BAR_TYPES.SUCCESS) {
        dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.NOTHING));
      }
    }, TIMERS.CLEAR_APP_ERROR);

    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  let finalClassName;

  if (type === SNACK_BAR_TYPES.SUCCESS) {
    finalClassName = `${style.snackBarWrapper} ${style.successBarWrapper}`;
  } else if (type === SNACK_BAR_TYPES.ERROR) {
    finalClassName = `${style.snackBarWrapper} ${style.errorBarWrapper}`;
  } else {
    finalClassName = `${style.snackBarWrapper}`;
  }

  return (
    <CSSTransition
      in={isShowError}
      timeout={300}
      classNames={style}
      unmountOnExit
      mountOnEnter
      nodeRef={nodeRef}
    >
      <div className={finalClassName} ref={nodeRef}>
        <div className={style.icon}>
          <FontAwesomeIcon
            icon={SNACK_BAR_TYPES.SUCCESS ? faCircleCheck : faCircleExclamation}
          />
        </div>
        <p>{message}</p>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={onCloseErrorBarHandler}
          className={style.closeSnackBar}
          onClick={onCloseErrorBarHandler}
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
    </CSSTransition>
  );
};
