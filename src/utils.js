export function makeFormatter(options) {
  if ('Intl' in window) {
    try {
      return new Intl.DateTimeFormat(undefined, options)
    } catch (e) {
      if (!(e instanceof RangeError)) {
        throw e
      }
    }
  }
}

let dayFirst = null

// Private: Determine if the day should be formatted before the month name in
// the user's current locale. For example, `9 Jun` for en-GB and `Jun 9`
// for en-US.
//
// Returns true if the day appears before the month.
export function isDayFirst() {
  if (dayFirst !== null) {
    return dayFirst
  }

  const formatter = makeFormatter({day: 'numeric', month: 'short'})
  if (formatter) {
    const output = formatter.format(new Date(0))
    dayFirst = !!output.match(/^\d/)
    return dayFirst
  } else {
    return false
  }
}

let yearSeparator = null

// Private: Determine if the year should be separated from the month and day
// with a comma. For example, `9 Jun 2014` in en-GB and `Jun 9, 2014` in en-US.
//
// Returns true if the date needs a separator.
export function isYearSeparator() {
  if (yearSeparator !== null) {
    return yearSeparator
  }

  const formatter = makeFormatter({day: 'numeric', month: 'short', year: 'numeric'})
  if (formatter) {
    const output = formatter.format(new Date(0))
    yearSeparator = !!output.match(/\d,/)
    return yearSeparator
  } else {
    return true
  }
}

// Private: Determine if the date occurs in the same year as today's date.
//
// date - The Date to test.
//
// Returns true if it's this year.
export function isThisYear(date) {
  const now = new Date()
  return now.getUTCFullYear() === date.getUTCFullYear()
}
