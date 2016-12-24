function toRussianNumber(number, type) {
  number = number % 100

  const number10 = number % 10

  // one:  1, 21, 31, ...
  // two:  2-4, 22-24, 32-34 ...
  // five: 5-20, 25-30, ...
  let one, two, five

  if (type === 'minutes') {
    one = 'минуту'
    two = 'минуты'
    five = 'минут'
  } else if (type === 'hours') {
    one = 'час'
    two = 'часа'
    five = 'часов'
  } else if (type === 'days') {
    one = 'день'
    two = 'дня'
    five = 'дней'
  } else if (type === 'months') {
    one = 'месяц'
    two = 'месяца'
    five = 'месяцев'
  } else if (type === 'years') {
    one = 'год'
    two = 'года'
    five = 'лет'
  }

  if (number10 === 1 && (number === 1 || number > 20)) {
    return number + ' ' + one
  } else if (number10 > 1 && number10 < 5 && (number > 20 || number < 10)) {
    return number + ' ' + two
  } else {
    return number + ' ' + five
  }
}

export function timeAgoToString(ago) {
  return ago + ' назад'
}

export function timeAheadToString(ahead) {
  return 'осталось ' + ahead
}

export function onDateToString(date) {
  return date
}

export function timeAgoFromMs(ms) {
  const sec = Math.round(ms / 1000)
  const min = Math.round(sec / 60)
  const hr = Math.round(min / 60)
  const day = Math.round(hr / 24)
  const month = Math.round(day / 30)
  const year = Math.round(month / 12)
  if (ms < 0) {
    return 'мгновение'
  } else if (sec < 10) {
    return 'мгновение'
  } else if (sec < 45) {
    return toRussianNumber(sec, 'seconds')
  } else if (sec < 90) {
    return 'минуту назад'
  } else if (min < 45) {
    return toRussianNumber(min, 'minutes')
  } else if (min < 90) {
    return 'час'
  } else if (hr < 24) {
    return toRussianNumber(hr, 'hours')
  } else if (hr < 36) {
    return 'день'
  } else if (day < 30) {
    return toRussianNumber(day, 'days')
  } else if (day < 45) {
    return 'месяц'
  } else if (month < 12) {
    return toRussianNumber(month, 'months')
  } else if (month < 18) {
    return 'год'
  } else {
    return toRussianNumber(year, 'years')
  }
}

export function timeUntilFromMs(ms) {
  const sec = Math.round(ms / 1000)
  const min = Math.round(sec / 60)
  const hr = Math.round(min / 60)
  const day = Math.round(hr / 24)
  const month = Math.round(day / 30)
  const year = Math.round(month / 12)
  if (month >= 18) {
    return toRussianNumber(year, 'years')
  } else if (month >= 12) {
    return 'год'
  } else if (day >= 45) {
    return toRussianNumber(month, 'months')
  } else if (day >= 30) {
    return 'месяц'
  } else if (hr >= 36) {
    return toRussianNumber(day, 'days')
  } else if (hr >= 24) {
    return 'день'
  } else if (min >= 90) {
    return toRussianNumber(hr, 'hours')
  } else if (min >= 45) {
    return 'час'
  } else if (sec >= 90) {
    return toRussianNumber(min, 'minutes')
  } else if (sec >= 45) {
    return 'минуту'
  } else if (sec >= 10) {
    return toRussianNumber(sec, 'seconds')
  } else {
    return 'одно мгновение'
  }
}
