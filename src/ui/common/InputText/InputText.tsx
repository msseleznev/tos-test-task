import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import s from './InputText.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText: (value: string) => void;
  error?: string;
  spanClassName?: string;
  customStyle?: string;
};

export const InputText: React.FC<SuperInputTextPropsType> = ({
  type,
  onChangeText,
  error,
  className,
  spanClassName,
  name,
  customStyle,

  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    onChangeText(e.currentTarget.value);
  };

  const finalSpanClassName = `${s.error} ${spanClassName || ''}`;
  const finalInputClassName = `${
    error ? `${s.errorInput} ${s.superInput}` : s.superInput
  } ${className}`;

  return (
    <div className={customStyle ? `${customStyle} ${s.inputWrapper}` : s.inputWrapper}>
      <input
        name={name}
        type={type}
        onChange={onChangeCallback}
        className={finalInputClassName}
        {...restProps}
      />
      {error && <div className={finalSpanClassName}>{error}</div>}
    </div>
  );
};
