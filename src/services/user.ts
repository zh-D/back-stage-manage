import { request } from 'ice';

export default {
  async getUser(values) {
    return await request({
        url: `/api/user`,
        method: 'post',
        data: values
    });
  },
}