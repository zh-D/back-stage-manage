import { request } from 'ice';

export default {

  async addGuardInfo(values) {

    const data = await request({
      url: `/api/addguardinfo`,
      method: 'post',
      data: values
    })
    
    return data
  },

  async deleteGuardInfo(roomid) {
    const data = await request({
      url: `/api/deleteguardinfo/${roomid}`,
      method: 'delete',
    })
    return data;
  },

  async editGuardInfo(dataSource) {
    const data = await request({
      url: `/api/editguardinfo`,
      method: 'put',
      data: dataSource
    })
    
    return data;
  },

  async getGuardInfo(formData) {
    if (!formData.status || formData.status === 'normal') {
      const data = await request(`/api/getguardinfo`)
      // data.map(item => {
      //   item.state = item.state === 0 ? "业主" : "租客";
      // })

      return ({
        total: data.length,
        list: data.slice(0, 10),
      })
    }
    if (formData.status === 'empty') {
      return Promise.resolve([]);
    }
    if (formData.status === 'exception') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('data exception'));
        }, 1000);
      });
    }
  
    return Promise.resolve([]);
    
  },

}
