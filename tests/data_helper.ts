import fs from 'node:fs'

import { promisify } from 'node:util'

import { resolve } from 'node:path'
import readline from 'node:readline'

import Decimal from 'break_infinity.js'

interface Quote {
  date: Date
  open: Decimal
  high: Decimal
  low: Decimal
  close: Decimal
  volume: Decimal
}

const quoteFromCsv = (data: string, useTimeStamp = false) => {
  const fromTimeStamp = (timeStamp: number) => new Date(timeStamp * 1000)

  const row = data.split(',')
  const dt = useTimeStamp
    ? fromTimeStamp(Number.parseInt(row[0]))
    : new Date(row[0])
  const open = new Decimal(row[1])
  const high = new Decimal(row[2])
  const low = new Decimal(row[3])
  const close = new Decimal(row[4])
  const volume = new Decimal(row[5])

  return {
    date: dt,
    open,
    high,
    low,
    close,
    volume
  }
}

async function* readFileStream(fileName: string, days = 500) {
  const fileStream = fs.createReadStream(
    // eslint-disable-next-line unicorn/prefer-module
    resolve(__dirname, 'test', 'data', fileName)
  )

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Number.POSITIVE_INFINITY
  })

  let lineCount = 0
  for await (const line of rl) {
    if (lineCount === 0) {
      // Skip the header line
      lineCount++
      continue
    }
    if (lineCount > days) {
      // Only process up to `days` lines
      break
    }
    yield quoteFromCsv(line)
    lineCount++
  }
}

const readFile = promisify(fs.readFile)

async function getQuotes(
  fileName: string,
  days: number,
  useTimeStamp = false
): Promise<Quote[]> {
  const fileContent = await readFile(
    // eslint-disable-next-line unicorn/prefer-module
    resolve(__dirname, 'test', 'data', fileName),
    'utf8'
  )

  const lines = fileContent.split('\n')

  const quotes: Quote[] = []

  for (let i = 1; i <= days && i < lines.length; i++) {
    quotes.push(quoteFromCsv(lines[i], useTimeStamp))
  }

  return quotes
}

export const getDefault = async (days = 502) =>
  await getQuotes('default.csv', days)

export const getZeroes = async (days = 200) =>
  await getQuotes('zeroes.csv', days)

export const getEthRMA = async (days = 500) =>
  await getQuotes('eth_rma.csv', days)

export const getBtcMFI = async (days = 820) =>
  await getQuotes('btc_mfi.csv', days)

export const getEthEr = async (days = 600) =>
  await getQuotes('eth_er.csv', days)

export const getGoldLinReg = async (days = 900) =>
  await getQuotes('gold_linreg.csv', days)

export const getGoldTci = async (days = 900) =>
  await getQuotes('gold_tci.csv', days)

export const getGoldWilly = async (days = 1000) =>
  await getQuotes('gold_willy.csv', days)

export const getEurUsdPhx = async (days = 700) =>
  await getQuotes('eurusd_phx.csv', days)

export const getEthSwma = async (days = 600) =>
  await getQuotes('eth_swma.csv', days)

export const getEthKama = async (days = 600) =>
  await getQuotes('eth_kama.csv', days)

export const getEthBbwp = async (days = 700) =>
  await getQuotes('eth_bbwp.csv', days)

export const getGoldAtr = async (days = 750) =>
  await getQuotes('gold_atr.csv', days)

export const getBtcMom = async (days = 800) =>
  await getQuotes('btc_mom.csv', days)

export const getAtrSlRma = async (days = 800) =>
  await getQuotes('atrsl_rma.csv', days)

export const getAtrSlSma = async (days = 800) =>
  await getQuotes('atrsl_sma.csv', days)

export const getAtrSlEma = async (days = 800) =>
  await getQuotes('atrsl_ema.csv', days)

export const getAtrSlWma = async (days = 800) =>
  await getQuotes('atrsl_wma.csv', days)

export const getBtcTr = async (days = 420) =>
  await getQuotes('btc_tr.csv', days)

export const getCrudePercentRank = async (days = 630) =>
  await getQuotes('%_rank_crude.csv', days)

export const getEthBbw = async (days = 630) =>
  await getQuotes('eth_bbw.csv', days)

export const getSpxAlma = async (days = 396) =>
  await getQuotes('eth_bbw.csv', days)

export const getBtcTsi = async (days = 900) =>
  await getQuotes('btc_tsi.csv', days)

export const getLongish = (days = 5285) => readFileStream('longish.csv', days)
