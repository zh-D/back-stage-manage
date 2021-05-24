import userService from '@/services/user';

export default {
  state: { login: false },

  effects: (dispatch) => ({
    async login(values) {
      const res = await userService.getUser(values);
      if (res.login === true) {
        dispatch.user.update(res);
        return true;
      } else {
        return false;
      }
    },
    async logout() {
      dispatch.user.update({ login: false });
    },
  }),

  reducers: {
    update(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },
};
