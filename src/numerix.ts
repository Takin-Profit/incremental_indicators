// Copyright 2023 Takin Profit. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
import { Either, Left, Right } from 'purify-ts'
import { TimeFrame } from './enums'
import { match } from 'ts-pattern'
import { TimeSpan } from 'timespan-ts'
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

// SLOPE of BEST FIT LINE
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

export const toTimeSpan = (timeFrame: TimeFrame): TimeSpan =>
  match(timeFrame)
    .with('ThirtyDays', () => TimeSpan.fromDays(30))
    .with('TwentyDays', () => TimeSpan.fromDays(20))
    .with('FifteenDays', () => TimeSpan.fromDays(15))
    .with('TenDays', () => TimeSpan.fromDays(10))
    .with('FiveDays', () => TimeSpan.fromDays(5))
    .with('ThreeDays', () => TimeSpan.fromDays(3))
    .with('TwoDays', () => TimeSpan.fromDays(2))
    .with('Day', () => TimeSpan.fromDays(1))
    .with('ThreeWeeks', () => TimeSpan.fromDays(21))
    .with('TwoWeeks', () => TimeSpan.fromDays(14))
    .with('Week', () => TimeSpan.fromDays(7))
    .with('TwelveHours', () => TimeSpan.fromHours(12))
    .with('EightHours', () => TimeSpan.fromHours(8))
    .with('SixHours', () => TimeSpan.fromHours(6))
    .with('FourHour', () => TimeSpan.fromHours(4))
    .with('ThreeHour', () => TimeSpan.fromHours(3))
    .with('TwoHour', () => TimeSpan.fromHours(2))
    .with('OneHour', () => TimeSpan.fromHours(1))
    .with('390min', () => TimeSpan.fromMinutes(390))
    .with('260min', () => TimeSpan.fromMinutes(260))
    .with('130min', () => TimeSpan.fromMinutes(130))
    .with('65min', () => TimeSpan.fromMinutes(6565))
    .with('45min', () => TimeSpan.fromMinutes(45))
    .with('30min', () => TimeSpan.fromMinutes(30))
    .with('24min', () => TimeSpan.fromMinutes(24))
    .with('15min', () => TimeSpan.fromMinutes(15))
    .with('12min', () => TimeSpan.fromMinutes(12))
    .with('5min', () => TimeSpan.fromMinutes(5))
    .with('3min', () => TimeSpan.fromMinutes(3))
    .with('1min', () => TimeSpan.fromMinutes(1))
    .exhaustive()
