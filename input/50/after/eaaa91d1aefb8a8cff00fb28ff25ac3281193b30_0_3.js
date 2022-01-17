function()
  {
    clearTimeout(this._timeout);
    this.running = false;
    if (this.onComplete) this.onComplete();
  }