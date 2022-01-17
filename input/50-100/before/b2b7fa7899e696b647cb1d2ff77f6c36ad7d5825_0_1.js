function() {
  while (this._listening && this._pending.length && this._active_count < 100) {
    this._dequeue();
  }
}