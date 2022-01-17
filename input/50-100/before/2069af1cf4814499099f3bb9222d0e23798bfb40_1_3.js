function() {
  if (this._args) {
    return this._args.slice(-1)[0].suffix.slice(-1) === ' ';
  }

  return this.toCanonicalString().slice(-1) === ' ';
}