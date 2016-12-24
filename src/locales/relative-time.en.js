export function timeAgoToString(ago) {
  return ago
}

export function timeAheadToString(ahead) {
  return ahead
}

export function onDateToString(date) {
  return 'on ' + date
}

export function timeAgoFromMs(ms) {
  const sec = Math.round(ms / 1000)
  const min = Math.round(sec / 60)
  const hr = Math.round(min / 60)
  const day = Math.round(hr / 24)
  const month = Math.round(day / 30)
  const year = Math.round(month / 12)
  if (ms < 0) {
    return 'just now'
  } else if (sec < 10) {
    return 'just now'
  } else if (sec < 45) {
    return sec + ' seconds ago'
  } else if (sec < 90) {
    return 'a minute ago'
  } else if (min < 45) {
    return min + ' minutes ago'
  } else if (min < 90) {
    return 'an hour ago'
  } else if (hr < 24) {
    return hr + ' hours ago'
  } else if (hr < 36) {
    return 'a day ago'
  } else if (day < 30) {
    return day + ' days ago'
  } else if (day < 45) {
    return 'a month ago'
  } else if (month < 12) {
    return month + ' months ago'
  } else if (month < 18) {
    return 'a year ago'
  } else {
    return year + ' years ago'
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
    return year + ' years from now'
  } else if (month >= 12) {
    return 'a year from now'
  } else if (day >= 45) {
    return month + ' months from now'
  } else if (day >= 30) {
    return 'a month from now'
  } else if (hr >= 36) {
    return day + ' days from now'
  } else if (hr >= 24) {
    return 'a day from now'
  } else if (min >= 90) {
    return hr + ' hours from now'
  } else if (min >= 45) {
    return 'an hour from now'
  } else if (sec >= 90) {
    return min + ' minutes from now'
  } else if (sec >= 45) {
    return 'a minute from now'
  } else if (sec >= 10) {
    return sec + ' seconds from now'
  } else {
    return 'just now'
  }
}
