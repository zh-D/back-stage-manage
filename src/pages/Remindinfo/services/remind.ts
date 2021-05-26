import { request } from 'ice';

export default {

  async getComplain() {
    const data = await request(`/api/getcomplain`);
    console.log(data);
    
    return data;
  },

}
