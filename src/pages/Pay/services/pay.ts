import { request } from 'ice';

export default {

  async addPayInfo(values) {

    const data = await request({
      url: `/api/addpayinfo`,
      method: 'post',
      data: values
    })
    
    return data
  },

  async deletePayInfo(roomid) {
    const data = await request({
      url: `/api/deletepayinfo/${roomid}`,
      method: 'delete',
    })
    return data;
  },

  async editPayInfo(dataSource) {
    const data = await request({
      url: `/api/editpayinfo`,
      method: 'put',
      data: dataSource
    })
    
    return data;
  },

  async getPayInfo(formData) {
    if (!formData.status || formData.status === 'normal') {
      const data = await request(`/api/getpayinfo`)
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
