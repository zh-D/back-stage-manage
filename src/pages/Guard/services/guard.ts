import { request } from 'ice';
import { timestampToTime, timeTotimestamp } from '../../../utils/timeUtils';

export default {

  async addGuardInfo(values) {
    values.xlsj = timeTotimestamp(values.xlsj)
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
    dataSource.xlsj = timeTotimestamp(dataSource.xlsj)
    
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
      console.log(data);
      
      data.map(item => {
        item.xlsj = timestampToTime(item.xlsj)
      })

      console.log(data);
      

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
