class CircularBuf {
  private _buffer: Float64Array
  private _start = 0
  private _counter = 0

  constructor(size: number) {
    this._buffer = new Float64Array(size)
  }

  // Provide filledSize property to return the filled size of the buffer
  get filledSize(): number {
    return this._counter
  }

  get values(): Float64Array {
    return this.isFull ? this._buffer : new Float64Array(0)
  }

  get orderedValues(): Iterable<number> {
    return this.isFull ? this._generateOrderedValues() : []
  }

  *_generateOrderedValues(): Iterable<number> {
    for (let i = 0; i < this._buffer.length; i++) {
      yield this._buffer[(this._start + i) % this._buffer.length]
    }
  }

  get first(): number {
    return this._counter > 0 && this.isFull
      ? this._buffer[this._start]
      : Number.NaN
  }

  get last(): number {
    return this.isFull
      ? this._buffer[
          (this._start - 1 + this._buffer.length) % this._buffer.length
        ]
      : Number.NaN
  }

  get length(): number {
    return this._buffer.length
  }

  get isFull(): boolean {
    return this._counter >= this._buffer.length
  }

  put(value: number): void {
    this._buffer[this._start] = value
    this._start = (this._start + 1) % this._buffer.length
    this._counter = Math.min(this._counter + 1, this._buffer.length)
  }
}
