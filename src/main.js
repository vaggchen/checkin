const api = require('./api/index')
const msg = require('./msg')
const { log, getCurrentTime } = require('./utils')
const { FULFILLED_STATUS, REJECTED_STATUS } = require('./const')

// 签到
const checkIn = async () => {
  try {
    await api.checkIn()

    log(msg.checkIn.success)
  } catch (err) {
    log(msg.checkIn.fail(err))
  }
}

// 沾一沾
const dipLuckcy = async () => {
  try {
    const { data = {} } = await api.getLotteryHistory()
    const lotteries = data.lotteries || []

    log(msg.dipLuckcy.info)

    if (lotteries.length) {
      const [firstLottery] = lotteries
      const { data = {} } = await api.dipLuckcy({ lottery_history_id: firstLottery.history_id })
      const { dip_value: val = 0, total_value: cur = 0 } = data

      log(msg.dipLuckcy.success(val, cur))
    }
  } catch (err) {
    log(msg.dipLuckcy.fail(err))
  }
}

// 免费抽奖
const drawLottery = async () => {
  try {
    const { data = {} } = await api.getFreeCount()
    const { free_count: n = 0 } = data

    log(msg.drawLottery.info(n))

    if (n) {
      const { data = {} } = await api.drawLottery()

      log(msg.drawLottery.success(data.lottery_name))
    }
  } catch (err) {
    log(msg.drawLottery.fail(err))
  }
}

// BugFix
const bugFix = async () => {
  try {
    const { data = [] } = await api.getBug()

    log(msg.bugFix.info(data.length))

    if (data.length) {
      const requests = data.map(item => api.bugFix(item))
      const result = await Promise.allSettled(requests)
      const fulfilled = result.filter(item => item.status === FULFILLED_STATUS)
      const rejected = result.filter(item => item.status === REJECTED_STATUS)

      log(msg.bugFix.success(fulfilled.length, rejected.length))
    }
  } catch (err) {
    log(msg.bugFix.fail(err))
  }
}

const main = async () => {
  log(getCurrentTime())

  await checkIn()
  await dipLuckcy()
  await drawLottery()
  await bugFix()
}

main()

