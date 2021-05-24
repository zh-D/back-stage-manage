import React from 'react';
import { Redirect } from 'ice';
import store from '@/store';

const LoginWrapper = (WrappedComponent) => {
  const Wrapped = (props) => {
    const [userState, userDispatchers] = store.useModel('user');
    return (
      <>
        {
          userState.login ? <Redirect to="/house/houseinfo" /> : <WrappedComponent {...props} />
        }
      </>
    )
  };

  return Wrapped;
}

export default LoginWrapper;
