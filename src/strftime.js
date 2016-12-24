import {weekdaysEN, monthsEN} from './locales/strftime-constants.en'
import {weekdaysRU, monthsRU} from './locales/strftime-constants.ru'

function pad(num) {
  return ('0' + num).slice(-2)
}

function getConstantsByLocale(locale) {
  if (locale === 'ru' || locale === 'RU' || locale === 'ru_RU') {
    return {
      weekdays: weekdaysRU,
      months: monthsRU
    }
  } else {
    return {
      weekdays: weekdaysEN,
      months: monthsEN
    }
  }
}

export function strftime(time, formatString, locale) {
  const day = time.getDay()
  const date = time.getDate()
  const month = time.getMonth()
  const year = time.getFullYear()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()
  const {weekdays, months} = getConstantsByLocale(locale)

  return formatString.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g, function(_arg) {
    let match
    const modifier = _arg[1]
    switch (modifier) {
      case '%':
        return '%'
      case 'a':
        return weekdays[day].slice(0, 3)
      case 'A':
        return weekdays[day]
      case 'b':
        return months[month].slice(0, 3)
      case 'B':
        return months[month]
      case 'c':
        return time.toString()
      case 'd':
        return pad(date)
      case 'e':
        return date
      case 'H':
        return pad(hour)
      case 'I':
        return pad(strftime(time, '%l'))
      case 'l':
        if (hour === 0 || hour === 12) {
          return 12
        } else {
          return (hour + 12) % 12
        }
      case 'm':
        return pad(month + 1)
      case 'M':
        return pad(minute)
      case 'p':
        if (hour > 11) {
          return 'PM'
        } else {
          return 'AM'
        }
      case 'P':
        if (hour > 11) {
          return 'pm'
        } else {
          return 'am'
        }
      case 'S':
        return pad(second)
      case 'w':
        return day
      case 'y':
        return pad(year % 100)
      case 'Y':
        return year
      case 'Z':
        match = time.toString().match(/\((\w+)\)$/)
        return match ? match[1] : ''
      case 'z':
        match = time.toString().match(/\w([+-]\d\d\d\d) /)
        return match ? match[1] : ''
    }
  })
}
