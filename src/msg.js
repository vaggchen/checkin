module.exports = {
  checkIn: {
    success: '[签到]：成功',
    fail: err => `[签到]：失败，原因：${err.err_msg || '未知'}`,
  },
  dipLuckcy: {
    info: '[沾一沾]：加载围观大奖列表成功',
    success: (val, cur) => `[沾一沾]：今日幸运值${val}点，进度${cur}/6000`,
    fail: err => `[沾一沾]：失败，原因：${err.err_msg || '未知'}`,
  },
  drawLottery: {
    info: n => `[抽奖]：免费次数${n}次`,
    success: val => `[抽奖]：恭喜成功抽中${val}`,
    fail: err => `[抽奖]：失败，原因：${err.err_msg || '未知'}`,
  },
  bugFix: {
    info: len => `[BugFix]：加载Bug列表成功，共${len}个`,
    success: (fulfilled, rejected) => `[BugFix]：消除成功${fulfilled}个，失败${rejected}个`,
    fail: err => `[BugFix]：失败，原因：${err.err_msg || '未知'}`,
  },
}