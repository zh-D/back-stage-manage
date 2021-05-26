import userService from '@/services/user';
import { helpers } from 'ice';

export default {
  state: { login: false, role: 'nono' },

  effects: (dispatch) => ({
    async login(values) {
      const { cookie } = helpers;
      const res = await userService.getUser(values);
      if (res.login === true) {
        dispatch.user.update(res);
        return true;
      } else {
        return false;
      }
    },
    async logout() {
      dispatch.user.update({ login: false, role: 'none' });
    },
  }),

  reducers: {
    update(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },
};
