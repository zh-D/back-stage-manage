import React from 'react';
import { useAuth, Redirect } from 'ice';
import store from '@/store';

const LoginWrapper = (WrappedComponent) => {
  const Wrapped = (props) => {
    const [userState, userDispatchers] = store.useModel('user');
    return (
      <>
        {
          userState.login ? (userState.role === 'admin' ? <WrappedComponent {...props} /> : <Redirect to="/guest/house/houseinfo"/>) : <Redirect to="/user/login" />
        }
      </>
    )
  };

  return Wrapped;
}

export default LoginWrapper;