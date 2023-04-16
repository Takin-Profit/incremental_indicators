// Copyright 2023 Takin Profit. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
import { Either, Left, Right } from 'purify-ts'

// Standard Deviation function
export const stdDev = (values: number[]): Either<Error, number> => {
  if (!values) {
    return Left(new Error('StdDev values cannot be null'))
  }
  let sd = 0
  const n = values.length
  if (n > 1) {
    let sum = 0
    for (let index = 0; index < n; index++) {
      sum += values[index]
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
