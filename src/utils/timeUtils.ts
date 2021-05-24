export function timestampToTime(timestamp) {
    if (timestamp === 0 || timestamp == null) {
      return ''
    } else {
      var date = new Date(timestamp)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return Y + M + D
    }
}

export function timeTotimestamp(strtime) {
  let date = new Date(strtime.replace(/-/g, '/'));
  let timestamp = date.getTime();

  return timestamp;
}