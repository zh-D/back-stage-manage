import { request } from 'ice';

export default {

  async addHouseInfo(values) {

    const data = await request({
      url: `/api/addhouseinfo`,
      method: 'post',
      data: values
    })
    
    return data
  },

  async deleteHouseInfo(roomid) {
    const data = await request({
      url: `/api/deletehouseinfo/${roomid}`,
      method: 'delete',
    })
    return data;
  },

  async editHouseInfo(dataSource) {
    const data = await request({
      url: `/api/edithouseinfo`,
      method: 'put',
      data: dataSource
    })
    
    return data;
  },

  async getHouseInfo(formData) {
    if (!formData.status || formData.status === 'normal') {
      const data = await request(`/api/gethouseinfo`)
      data.map(item => {
        item.state = item.state === 0 ? "已购买" : "租客";
      })

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
