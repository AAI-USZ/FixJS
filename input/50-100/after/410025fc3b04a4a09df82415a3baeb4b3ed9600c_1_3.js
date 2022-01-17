function() {
  // This is not as easy as doing (this.toString().slice(-1) === ' ')
  // See the doc comments above; We're checking for separators, not spaces
  if (this._args) {
    var lastArg = this._args.slice(-1)[0];
    if (lastArg.suffix.slice(-1) === ' ') {
      return true;
    }
    return lastArg.text === '' && lastArg.suffix === ''
        && lastArg.prefix.slice(-1) === ' ';
  }

  return this.toCanonicalString().slice(-1) === ' ';
}