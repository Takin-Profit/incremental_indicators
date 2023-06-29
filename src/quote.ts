import Decimal from 'break_infinity.js'
import { CandlePart } from './enums'
import { minDate } from './util'

/**
 * A type that represents a quote for a financial asset.
 */
export type Quote = Readonly<{
  /**
   * Checks if the quote is empty.
   */
  isEmpty: boolean

  /**
   * Returns the timestamp of the quote as a string.
   */
  time: string

  /**
   * Gets the opening price for the quote.
   */
  open: number

  /**
   * Gets the highest price for the quote.
   */
  high: number

  /**
   * Gets the lowest price for the quote.
   */
  low: number

  /**
   * Gets the closing price for the quote.
   */
  close: number

  /**
   * Gets the volume of the quote.
   */
  vol: number

  /**
   * Gets the (High + Low) / 2 price for the quote.
   */
  hl2: number

  /**
   * Gets the (High + Low + Close) / 3 price for the quote.
   */
  hlc3: number

  /**
   * Gets the (Open + Close) / 2 price for the quote.
   */
  oc2: number

  /**
   * Gets the (Open + High + Low) / 3 price for the quote.
   */
  ohl3: number

  /**
   * Gets the (Open + High + Low + Close) / 4 price for the quote.
   */
  ohlc4: number

  /**
   * Gets the HLC (High, Low, Close) data for the quote.
   */
  hlc: Hlc

  /**
   * Provides price data as a number, based on the selected candle part of the quote.
   */
  priceDataOnly: (candlePart: CandlePart) => number

  /**
   * Provides price data, based on the selected candle part of the quote.
   */
  priceData: (candlePart: CandlePart) => PriceData

  /**
   * Provides PriceAndVolData based on the selected candle part of the quote.
   */
  priceDataWithVol: (candlePart: CandlePart) => PriceDataWithVol
}>

/**
 * Represents partial data from a stock quote, specifically a timestamp and a data point.
 * The data point could be any of a variety of price-related measurements (e.g., close price, high price, low price, etc.).
 * This is a readonly type, meaning its properties cannot be changed after it is created.
 */
export type PriceData = Readonly<{
  /** The timestamp of the stock quote. */
  time: string

  /** The data point, representing a price-related measurement. */
  data: number
}>

/**
 * Represents partial data from a stock quote, including a timestamp, a data point,
 * and a volume. The data point could be any of a variety of price-related measurements.
 * This is a readonly type, meaning its properties cannot be changed after it is created.
 */
export type PriceDataWithVol = Readonly<
  PriceData & {
    /**
     * The trading volume, representing the number of shares or contracts traded during a given period.
     */
    vol: number
  }
>

/**
 * Represents the High, Low, and Close values of a financial quote.
 * This data structure is commonly used in the calculation of various technical indicators, such as the Average True
 * Range (ATR).
 */
export type Hlc = Readonly<{
  /**
   * The highest traded price of the financial instrument during a specified time period (e.g., a trading day).
   */
  high: number

  /**
   * The lowest traded price of the financial instrument during a specified time period (e.g., a trading day).
   */
  low: number

  /**
   * The final traded price of the financial instrument at the end of a specified time period (e.g., a trading day).
   */
  close: number
}>

const _createQuote = ({
  date,
  open,
  high,
  low,
  close,
  vol
}: {
  date: Date
  open: number
  high: number
  low: number
  close: number
  vol: number
}): Quote => {
  const o = new Decimal(open)
  const h = new Decimal(high)
  const l = new Decimal(low)
  const c = new Decimal(close)
  const v = new Decimal(vol)
  return {
    time: date.toUTCString(),

    get isEmpty() {
      return date.toUTCString() === minDate
    },

    get high() {
      return h.toNumber()
    },
    get low() {
      return l.toNumber()
    },
    get close() {
      return c.toNumber()
    },
    get vol() {
      return v.toNumber()
    },
    get open() {
      return o.toNumber()
    },
    get hl2() {
      return h.plus(l).divideBy(2).toNumber()
    },
    get hlc3() {
      return h.plus(l).plus(c).divideBy(3).toNumber()
    },

    get oc2() {
      return o.plus(c).divideBy(2).toNumber()
    },

    get ohl3() {
      return o.plus(h).plus(l).divideBy(3).toNumber()
    },
    get ohlc4() {
      return o.plus(h).plus(l).plus(c).divideBy(4).toNumber()
    },

    priceDataOnly(candlePart: CandlePart = 'Close') {
      return toPriceDataDouble(this, candlePart)
    },

    priceData(candlePart: CandlePart = 'Close') {
      return toPriceData(this, candlePart)
    },

    priceDataWithVol(candlePart: CandlePart = 'Close') {
      return toPriceDataWithVol(this, candlePart)
    }
  } as Quote
}

const empty: Quote = {
  isEmpty: true,
  time: minDate,
  open: 0,
  high: 0,
  low: 0,
  close: 0,
  vol: 0,
  hl2: 0,
  hlc3: 0,
  oc2: 0,
  ohl3: 0,
  ohlc4: 0,
  hlc: { high: 0, low: 0, close: 0 }
} as Quote

export const Quote = {
  empty,

  /**
   * Performs validation on the quote data and returns a new Quote object if
   * validation succeeds or an object with an error message otherwise.
   * @returns `Quote | {errMsg: string}`
   *
   */
  create({
    date,
    open,
    high,
    low,
    close,
    vol
  }: {
    date: Date
    open: number
    high: number
    low: number
    close: number
    vol: number
  }):
    | Quote
    | {
        errMsg: string
      } {
    const result = validate({ open, high, low, close, vol })

    if (Object.prototype.hasOwnProperty.call(result, 'errMsg')) {
      return result as {
        errMsg: string
      }
    }
    return _createQuote({ date, open, high, low, close, vol })
  }
}

const validate = ({
  open,
  high,
  low,
  close,
  vol
}: {
  open: number
  high: number
  low: number
  close: number
  vol: number
}): { errMsg: string } | { ok: true } => {
  if (low <= open && low <= high && high >= open && high >= close && vol >= 0) {
    return {
      errMsg: `low cannot be greater than high or open, high cannot be less than open close or low, and volume must be greater than zero please check the provided data {open: ${open} , high: ${high}, low: ${low}, close: ${close} , volume: ${vol}`
    }
  }

  return { ok: true }
}

const toPriceDataDouble = (quote: Quote, candlePart: CandlePart = 'Close') => {
  switch (candlePart) {
    case 'Open': {
      return quote.open
    }
    case 'High': {
      return quote.high
    }
    case 'Low': {
      return quote.low
    }
    case 'Close': {
      return quote.close
    }
    case 'Volume': {
      return quote.vol
    }
    case 'HL2': {
      return quote.hl2
    }
    case 'HLC3': {
      return quote.hlc3
    }
    case 'OC2': {
      return quote.oc2
    }
    case 'OHL3': {
      return quote.ohl3
    }
    case 'OHLC4': {
      return quote.ohlc4
    }
  }
}

const toPriceData = (
  quote: Quote,
  candlePart: CandlePart = 'Close'
): PriceData => ({
  time: quote.time,
  data: toPriceDataDouble(quote, candlePart)
})

const toPriceDataWithVol = (
  quote: Quote,
  candlePart: CandlePart = 'Close'
) => ({
  time: quote.time,
  data: toPriceDataDouble(quote, candlePart),
  vol: quote.vol
})
