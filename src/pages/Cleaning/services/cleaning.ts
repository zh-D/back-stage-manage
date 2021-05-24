import { request } from 'ice';
import { timestampToTime, timeTotimestamp } from '../../../utils/timeUtils';

export default {

  async addCleaningInfo(values) {
    values.qjsj = timeTotimestamp(values.qjsj);
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
    dataSource.qjsj = timeTotimestamp(dataSource.qjsj);
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
      data.map(item => {
        item.qjsj = timestampToTime(item.qjsj)
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
