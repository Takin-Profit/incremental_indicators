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

// eslint-disable-next-line import/named
import { Draft, enablePatches, Patch, produceWithPatches } from 'immer'
import {
  Atom,
  atom,
  Computed,
  computed,
  isUninitialized,
  RESET_VALUE,
  withDiff
} from 'signia'

enablePatches()
export type Brand<K, T> = K & { __brand: T }

class ImmerAtom<T> {
  // The second Atom type parameter is the type of the diff
  readonly atom: Atom<T, Patch[]>

  constructor(name: string, initialValue: T) {
    this.atom = atom(name, initialValue, {
      // In order to store diffs, we need to provide the `historyLength` argument
      // to the atom constructor.
      // Otherwise, it will not allocate a history buffer.
      historyLength: 100
    })
  }

  update(fn: (draft: T) => void) {
    const [nextValue, patches] = produceWithPatches(this.atom.value, fn)
    this.atom.set(nextValue, patches)
  }
}
export function map<T, U>(
  source: ImmerAtom<T[]>,
  mapper: (value: T) => U
): Computed<U[], Patch[]> {
  return computed(
    `${source.atom.name}:mapped`,
    // eslint-disable-next-line sonarjs/cognitive-complexity
    (previous, lastComputedEpoch) => {
      // we need to check whether this is the first time we're running
      if (isUninitialized(previous)) {
        // if so, just map over the array and return it
        // eslint-disable-next-line unicorn/no-array-callback-reference
        return source.atom.value.map(mapper)
      }

      // this is not the first time we're running, so we need to calculate the diff of the source atom
      const diffs = source.atom.getDiffSince(lastComputedEpoch)
      // if there is not enough history to calculate the diff, this will be the RESET_VALUE constant
      if (diffs === RESET_VALUE) {
        if (process.env.NODE_ENV === 'development') {
          // stop vscode deletion on next line

          console.warn(
            `HISTORY RESET_VALUE triggered. Current historyLength: 100`
          )
        }
        // in which case, we need to start over
        // eslint-disable-next-line unicorn/no-array-callback-reference
        return source.atom.value.map(mapper)
      }

      // we have diffs and a previous value
      const [next, patches] = produceWithPatches(previous, draft => {
        // apply the upstream diffs while generating a new set of downstream diffs
        for (const patch of diffs.flat()) {
          const index = patch.path[0]
          if (typeof index !== 'number') {
            // this will be array length changes
            draft[patch.path[0] as 'length'] = patch.value as number
            continue
          }
          switch (patch.op) {
            case 'add': {
              if (patch.path.length === 1) {
                // this is a new item in the array, we need to splice it in and call the map function on it
                draft.splice(
                  patch.path[0] as number,
                  0,
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  mapper(patch.value) as Draft<U>
                )
              } else {
                // one of the existing items in the array has changed deeply
                // let's call the map function on the new value
                draft[index] = mapper(source.atom.value[index]) as Draft<U>
              }

              break
            }
            case 'replace': {
              // one of the existing items in the array has been fully replaced
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              draft[index] = mapper(patch.value) as Draft<U>

              break
            }
            case 'remove': {
              next.splice(index, 1)

              break
            }
            // No default
          }
        }
      })

      // withDiff is a helper function that returns a special value that tells Signia to use the
      // provided value and diff
      return withDiff(next, patches)
    },
    {
      historyLength: 100
    }
  )
}

export const minDate = new Date(-8_640_000_000_000_000).toUTCString()
