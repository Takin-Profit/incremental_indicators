import { CircularBuf } from './circular_buffer'
import { TaFunc, average } from './util'

export function getSMA(len = 20): TaFunc {
  const buffer = new CircularBuf(len)

  return (data: number) => {
    buffer.put(data)

    return buffer.isFull ? average(buffer.values) : Number.NaN
  }
}
