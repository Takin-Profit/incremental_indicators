import { CircularBuf } from './circular_buffer'

export const getAlma = ({ len = 20, offset = 0.85, sigma = 6 } = {}) => {
  const window = new CircularBuf(len)
  const windowSize = len
  const m = offset * (windowSize - 1)
  const s = windowSize / sigma

  return (data: number): number => {
    window.put(data)

    if (window.filledSize < len) {
      return Number.NaN
    }

    let norm = 0
    let sum = 0
    const weights: number[] = []
    for (let i = 0; i < windowSize; i++) {
      weights[i] = Math.exp(-0.5 * Math.pow((i - m) / s, 2))
      norm += weights[i]
    }

    // eslint-disable-next-line array-func/prefer-array-from
    const bufValues = [...window.orderedValues]
    for (let i = 0; i < windowSize; i++) {
      sum += bufValues[i] * weights[i]
    }

    return sum / norm
  }
}
