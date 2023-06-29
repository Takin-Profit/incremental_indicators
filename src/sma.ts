import { CircularBuf } from './circular_buffer'
import { average } from './util'

export const getSMA = (len = 20) => {
  const buffer = new CircularBuf(len)

  return (data: number) => {
    buffer.put(data)

    return buffer.isFull ? average(buffer.values) : Number.NaN
  }
}
