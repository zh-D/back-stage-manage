import { request } from 'ice';
import { timestampToTime, timeTotimestamp } from '../../../utils/timeUtils';

export default {

  async addPayInfo(values) {
    values.jfsj = timeTotimestamp(values.jfsj);
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
    dataSource.jfsj = timeTotimestamp(dataSource.jfsj);
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
      data.map(item => {
        item.jfsj = timestampToTime(item.jfsj)
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

  async getOweInfo(formData) {
    if (!formData.status || formData.status === 'normal') {
      const data = await request(`/api/getpayinfo`)
      data.map(item => {
        if (Number(item.sdf) > 0) {
          item.sdf = 0;
        }
        if (Number(item.glf) > 0) {
          item.glf = 0;
        }
        if (Number(item.ljf) > 0) {
          item.ljf = 0;
        }

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
