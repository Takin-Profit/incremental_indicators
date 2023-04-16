// Copyright 2023 Takin Profit. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
import { Either, Left, Right } from 'purify-ts'

// Standard Deviation function
export const stdDev = (values: number[]): Either<Error, number> => {
  // eslint-disable-next-line unicorn/no-null
  if (values == null) {
    return Left(new Error('StdDev values cannot be null'))
  }
  let sd = 0
  const n = values.length
  if (n > 1) {
    let sum = 0
    for (let i = 0; i < n; i++) {
      sum += values[i]
    }
    const avg = sum / n
    let sumSq = 0
    for (let index = 0; index < n; index++) {
      const d = values[index]
      sumSq += (d - avg) * (d - avg)
    }
    sd = Math.sqrt(sumSq / n)
  }
  return Right(sd)
}

export const slope = (x: number[], y: number[]): Either<Error, number> => {
  // eslint-disable-next-line unicorn/no-null
  if (x == null) {
    return Left(new Error('Slope X values cannot be null.'))
  }
  // eslint-disable-next-line unicorn/no-null
  if (y == null) {
    return Left(new Error('Slope Y values cannot be null'))
  }
  if (x.length !== y.length) {
    return Left(new Error('Slope X and Y arrays must be the same size.'))
  }
  const length = x.length
  let sumX = 0
  let sumY = 0
  for (let i = 0; i < length; i++) {
    sumX += x[i]
    sumY += y[i]
  }
  const avgX = sumX / length
  const avgY = sumY / length

  // least squares method
  let sumSqX = 0
  let sumSqXY = 0

  for (let i = 0; i < length; i++) {
    const devX = x[i] - avgX
    const devY = y[i] - avgY

    sumSqX += devX * devX
    sumSqXY += devX * devY
  }
  return Right(sumSqXY / sumSqX)
}
