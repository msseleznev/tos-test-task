import React from 'react';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styleModule from './Preloader.module.scss';

type PreloaderPropsType = {
  size: string;
  color: string;
};

export const Preloader: React.FC<PreloaderPropsType> = ({
  size,
  color,
}: PreloaderPropsType) => {
  return (
    <div className={styleModule.preloaderBlock}>
      <FontAwesomeIcon
        style={{ fontSize: size, color }}
        className={styleModule.preloaderIcon}
        icon={faSpinner}
      />
    </div>
  );
};
