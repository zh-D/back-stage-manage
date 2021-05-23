import { request } from 'ice';

export default {

  async addCleaningInfo(values) {

    const data = await request({
      url: `/api/addcleaninginfo`,
      method: 'post',
      data: values
    })
    
    return data
  },

  async deleteCleaningInfo(roomid) {
    const data = await request({
      url: `/api/deletecleaninginfo/${roomid}`,
      method: 'delete',
    })
    return data;
  },

  async editCleaningInfo(dataSource) {
    const data = await request({
      url: `/api/editcleaninginfo`,
      method: 'put',
      data: dataSource
    })
    
    return data;
  },

  async getCleaningInfo(formData) {
    if (!formData.status || formData.status === 'normal') {
      const data = await request(`/api/getcleaninginfo`)
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
