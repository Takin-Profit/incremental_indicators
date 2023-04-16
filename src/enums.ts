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
export type CandlePart =
  | 'Open'
  | 'High'
  | 'Low'
  | 'Close'
  | 'Volume'
  | 'HL2'
  | 'HLC3'
  | 'OC2'
  | 'OHLC3'
  | 'OHLC4'

export enum EndType {
  Close,
  HighLow
}

export type Match =
  | 'BullConfirmed'
  | 'BullSignal'
  | 'BullBias'
  | 'Neutral'
  | 'None'
  | 'BearBias'
  | 'BearSignal'
  | 'BearConfirmed'

export type MaType =
  | 'ALMA'
  | 'EMA'
  | 'LSMA'
  | 'HMA'
  | 'KAMA'
  | 'MAMA'
  | 'SMA'
  | 'SMMA'
  | 'TEMA'
  | 'WMA'

export type TimeFrame =
  | 'Month'
  | 'ThreeWeeks'
  | 'TwoWeeks'
  | 'Week'
  | 'ThirtyDays'
  | 'TwentyDays'
  | 'FifteenDays'
  | 'TenDays'
  | 'FiveDay'
  | 'ThreeDay'
  | 'TwoDay'
  | 'Day'
  | 'TwelveHours'
  | 'EightHours'
  | 'SixHours'
  | 'FourHour'
  | 'ThreeHour'
  | 'TwoHour'
  | 'OneHour'
  | '390min'
  | '260min'
  | '130min'
  | '65min'
  | '30min'
  | '15min'
  | '12min'
  | '5min'
  | '3min'
  | '1min'

export type SyncType = 'Prepend' | 'AppendOnly' | 'RemoveOnly' | 'FullMatch'
