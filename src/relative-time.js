import {strftime} from './strftime'
import {makeFormatter, isDayFirst, isThisYear, isYearSeparator} from './utils'
import * as RelativeTimeEN from './locales/relative-time.en'
import * as RelativeTimeRU from './locales/relative-time.ru'

export default class RelativeTime {
  constructor(date, locale) {
    this.date = date
    this.locale = locale
  }

  toString() {
    const ago = this.timeElapsed()
    if (ago) {
      return this.timeAgoToString(ago)
    } else {
      const ahead = this.timeAhead()
      if (ahead) {
        return this.timeAheadToString(ahead)
      } else {
        return this.onDateToString(this.formatDate())
      }
    }
  }

  timeElapsed() {
    const ms = new Date().getTime() - this.date.getTime()
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    if (ms >= 0 && day < 30) {
      return this.timeAgoFromMs(ms)
    } else {
      return null
    }
  }

  timeAhead() {
    const ms = this.date.getTime() - new Date().getTime()
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    if (ms >= 0 && day < 30) {
      return this.timeUntil()
    } else {
      return null
    }
  }

  timeAgo() {
    const ms = new Date().getTime() - this.date.getTime()
    return this.timeAgoFromMs(ms)
  }

  timeAgoFromMs(ms) {
    const { locale } = this
    if (locale === 'ru' || locale === 'RU' || locale === 'ru_RU') {
      return RelativeTimeRU.timeAgoFromMs(ms)
    } else {
      return RelativeTimeEN.timeAgoFromMs(ms)
    }
  }

  timeAgoToString(ago) {
    const { locale } = this
    if (locale === 'ru' || locale === 'RU' || locale === 'ru_RU') {
      return RelativeTimeRU.timeAgoToString(ago)
    } else {
      return RelativeTimeEN.timeAgoToString(ago)
    }
  }

  timeAheadToString(ahead) {
    const { locale } = this
    if (locale === 'ru' || locale === 'RU' || locale === 'ru_RU') {
      return RelativeTimeRU.timeAheadToString(ahead)
    } else {
      return RelativeTimeEN.timeAheadToString(ahead)
    }
  }

  onDateToString(date) {
    const { locale } = this
    if (locale === 'ru' || locale === 'RU' || locale === 'ru_RU') {
      return RelativeTimeRU.onDateToString(date)
    } else {
      return RelativeTimeEN.onDateToString(date)
    }
  }

  microTimeAgo() {
    const ms = new Date().getTime() - this.date.getTime()
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    const month = Math.round(day / 30)
    const year = Math.round(month / 12)
    if (min < 1) {
      return '1m'
    } else if (min < 60) {
      return min + 'm'
    } else if (hr < 24) {
      return hr + 'h'
    } else if (day < 365) {
      return day + 'd'
    } else {
      return year + 'y'
    }
  }

  timeUntil() {
    const ms = this.date.getTime() - new Date().getTime()
    return this.timeUntilFromMs(ms)
  }

  timeUntilFromMs(ms) {
    const { locale } = this
    if (locale === 'ru' || locale === 'RU' || locale === 'ru_RU') {
      return RelativeTimeRU.timeUntilFromMs(ms)
    } else {
      return RelativeTimeEN.timeUntilFromMs(ms)
    }
  }

  microTimeUntil() {
    const ms = this.date.getTime() - new Date().getTime()
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    const month = Math.round(day / 30)
    const year = Math.round(month / 12)
    if (day >= 365) {
      return year + 'y'
    } else if (hr >= 24) {
      return day + 'd'
    } else if (min >= 60) {
      return hr + 'h'
    } else if (min > 1) {
      return min + 'm'
    } else {
      return '1m'
    }
  }

  formatDate() {
    const { locale } = this
    let format
    if (locale === 'ru' || locale === 'RU' || locale === 'ru_RU') {
      format = isDayFirst() ? '%e %B' : '%B %e'
    } else {
      format = isDayFirst() ? '%e %b' : '%b %e'
    }
    if (!isThisYear(this.date)) {
      format += isYearSeparator() ? ', %Y': ' %Y'
    }
    return strftime(this.date, format, this.locale)
  }

  formatTime() {
    const formatter = makeFormatter({hour: 'numeric', minute: '2-digit'})
    if (formatter) {
      return formatter.format(this.date)
    } else {
      return strftime(this.date, '%l:%M%P', this.locale)
    }
  }
}
