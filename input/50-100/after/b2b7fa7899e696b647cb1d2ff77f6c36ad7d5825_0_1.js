function() {
  debug('pre fill, active:', this._active_count, 'pending:', this._pending.length);
  while (this._listening && this._pending.length && this._active_count < 100) {
    this._dequeue();
  }
  debug('post fill, active:', this._active_count, 'pending:', this._pending.length);
}