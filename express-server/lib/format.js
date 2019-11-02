const moment = require('moment')

const getStringDate = date => {
  let dateMoment = moment(date)
  if (!dateMoment.isDST()) {
    dateMoment.subtract(1, 'hours')
  }
  return dateMoment.format('YYYY-MM-DD HH-mm-ss')
}

module.exports = {
  getStringDate
}
