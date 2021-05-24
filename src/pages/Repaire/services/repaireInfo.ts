import { request } from 'ice';
import { timestampToTime, timeTotimestamp } from '../../../utils/timeUtils';

export default {

  async addRepaireInfo(values) {
    values.wxsj = timeTotimestamp(values.wxsj);
    const data = await request({
      url: `/api/addrepaireinfo`,
      method: 'post',
      data: values
    })
    
    return data
  },

  async deleteRepaireInfo(roomid) {
    const data = await request({
      url: `/api/deleterepaireinfo/${roomid}`,
      method: 'delete',
    })
    return data;
  },

  async editRepaireInfo(dataSource) {
    dataSource.wxsj = timeTotimestamp(dataSource.wxsj);
    const data = await request({
      url: `/api/editrepaireinfo`,
      method: 'put',
      data: dataSource
    })
    
    return data;
  },

  async getRepaireInfo(formData) {
    if (!formData.status || formData.status === 'normal') {
      const data = await request(`/api/getrepaireinfo`)
      data.map(item => {
        item.wxsj = timestampToTime(item.wxsj);
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
