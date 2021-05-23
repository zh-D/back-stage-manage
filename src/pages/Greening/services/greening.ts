import { request } from 'ice';

export default {

  async addGreeningInfo(values) {

    const data = await request({
      url: `/api/addgreeninginfo`,
      method: 'post',
      data: values
    })
    
    return data
  },

  async deleteGreeningInfo(roomid) {
    const data = await request({
      url: `/api/deletegreeninginfo/${roomid}`,
      method: 'delete',
    })
    return data;
  },

  async editGreeningInfo(dataSource) {
    const data = await request({
      url: `/api/editgreeninginfo`,
      method: 'put',
      data: dataSource
    })
    
    return data;
  },

  async getGreeningInfo(formData) {
    if (!formData.status || formData.status === 'normal') {
      const data = await request(`/api/getgreeninginfo`)
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
