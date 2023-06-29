/*
 * Takin Profit Llc Open Source.
 * Copyright (c) 2023.
 * mailto:takinprofit AT gmail DOT com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const minDate = new Date(-8_640_000_000_000_000).toUTCString()

export const average = (arr: Float64Array): number => {
  let sum = 0
  for (const element of arr) {
    sum += element
  }
  return sum / arr.length
}

export type Brand<K, T> = K & { __brand: T }

export type TaFunc = (data: number) => number
