import bigDecimal from 'js-big-decimal'

const DEFAULT_PRECISION = 8

/**
 * Formatting numbers with the number of digits after the decimal point
 * @param {number|string} val - Value for formatting
 * @param {number} x - Number of digits after the decimal point
 * @param {boolean} floor - type of rounding
 * @returns {string} Formatted value or 0 if no value is specified
 */
export default function (
  val: number | string,
  x?: number,
  floor?: boolean,
): string {
  const value = typeof val === 'string' ? parseFloat(val) : val

  if (!value) return '0'

  const bigNum = new bigDecimal(value)
  let num

  if (floor) {
    num = bigNum.round(x || DEFAULT_PRECISION, bigDecimal.RoundingModes.DOWN)
  } else {
    num = bigNum.round(x || DEFAULT_PRECISION, bigDecimal.RoundingModes.CEILING)
  }

  num = num.getValue()

  while (num[num.length - 1] === '0') {
    num = num.slice(0, -1)
  }

  if (num[num.length - 1] === '.') {
    num = num.slice(0, -1)
  }

  return num
}
