import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, LinearProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { navigate } from 'gatsby';

import Layout from '@/components/layout';

import { useAuth } from '../providers/auth';

type LoginProps = {
  isRegistration: boolean;
};

/**
 * Used for both login and registration
 * Displays simple form for credential input
 */
const Login: FunctionComponent<LoginProps> = ({ isRegistration }) => {
  const { t } = useTranslation();
  const { login, isAuthenticated, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  if (isAuthenticated) {
    //   Redirect
    navigate('/');
  }

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    setter(event.target.value);
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    if (loading) {
      return;
    }
    if (isRegistration && password !== passwordConfirm) {
      console.log('passwords do not match');
      // TODO: add feedback
      return;
    }
    login(email, password, isRegistration);
  };

  return (
    <Layout title={t(`login.title.${isRegistration ? 'register' : 'login'}`)}>
      {loading && <LinearProgress color="secondary" />}
      <Box
        alignItems="center"
        alignSelf="center"
        display="flex"
        flexGrow="1"
        justifySelf="center"
      >
        <form autoComplete="off" noValidate onSubmit={onSubmit}>
          <div>
            <TextField
              disabled={loading}
              label={t('login.email')}
              margin="normal"
              onChange={handleChange(setEmail)}
              type="email"
              value={email}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              disabled={loading}
              label={t('login.password')}
              margin="normal"
              onChange={handleChange(setPassword)}
              type="password"
              value={password}
              variant="outlined"
            />
          </div>
          {isRegistration && (
            <div>
              <TextField
                disabled={loading}
                label={t('login.passwordConfirm')}
                margin="normal"
                onChange={handleChange(setPasswordConfirm)}
                type="password"
                value={passwordConfirm}
                variant="outlined"
              />
            </div>
          )}
          <Button color="secondary" fullWidth type="submit" variant="contained">
            {t(`login.submit.${isRegistration ? 'register' : 'login'}`)}
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default Login;