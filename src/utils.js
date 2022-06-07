const moment = require('moment-timezone')
const { timezone } = require('./config.js')

module.exports = {
  log: msg => console.log(msg),
  getCurrentTime: () => {
    const localTime = moment.utc().tz(timezone).format('YYYY/MM/DD HH:mm:ss')
    const serverTimezone = moment.tz.guess(true)

    return `[系统提示]：本地时间 ${localTime}，服务器时区 ${serverTimezone}`
  },
}