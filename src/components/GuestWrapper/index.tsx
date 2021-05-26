import React from 'react';
import { Redirect } from 'ice';
import store from '@/store';

const GuestWrapper = (WrappedComponent) => {
  const Wrapped = (props) => {
    const [userState, userDispatchers] = store.useModel('user');
    return (
      <>
        {
          userState.login ? (userState.role !== 'admin' ? <WrappedComponent {...props} /> : <Redirect to="/admin/house/houseinfo"/>) : <Redirect to="/user/login" />
        }
      </>
    )
  };

  return Wrapped;
}

export default GuestWrapper;