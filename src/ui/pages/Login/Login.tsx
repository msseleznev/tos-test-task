import React from 'react';

import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../bll/hooks/hooks';
import { loginTC } from '../../../bll/login/login-reducer';
import { Button } from '../../common/Button/Button';
import { InputText } from '../../common/InputText/InputText';
import paperStyle from '../../common/styles/classes.module.scss';
import { PATH } from '../../routes/RoutesApp';

import style from './Login.module.scss';

import { LoginParamsType } from 'types/types';
import { Preloader } from 'ui/common/Preloader/Preloader';

export const Login: React.FC = () => {
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const isAppFetching = useAppSelector(state => state.app.isAppFetching);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    } as LoginParamsType,

    onSubmit: (values: LoginParamsType) => {
      dispatch(loginTC(values));
    },
    validate: (values: LoginParamsType) => {
      const errors = {} as LoginParamsType;

      if (!values.login) {
        errors.login = 'Field is required';
      }
      if (!values.password) {
        errors.password = 'Field is required';
      }

      return errors;
    },
  });
  const loginFieldError =
    formik.errors.login && formik.touched.login ? formik.errors.login : '';
  const passwordFieldError =
    formik.errors.password && formik.touched.password ? formik.errors.password : '';

  if (isLoggedIn) {
    return <Navigate to={PATH.CONTACTS} />;
  }

  return (
    <div className={style.loginBlock}>
      <div className={`${style.loginContainer} ${paperStyle.shadowPaper}`} data-z="paper">
        <form className={style.form} onSubmit={formik.handleSubmit}>
          <InputText
            type="login"
            error={loginFieldError}
            placeholder="Login"
            className={style.inputField}
            onChangeText={formik.handleChange}
            {...formik.getFieldProps('login')}
          />
          <InputText
            type="password"
            error={passwordFieldError}
            placeholder="Password"
            className={style.inputField}
            onChangeText={formik.handleChange}
            {...formik.getFieldProps('password')}
          />
          <div className={style.loginButtonBlock}>
            {isAppFetching ? (
              <Preloader size="20px" color="#42A5F5" />
            ) : (
              <Button disabled={!!loginFieldError || !!passwordFieldError} type="submit">
                Login
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
