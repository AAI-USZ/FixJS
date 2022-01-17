function(query, cb) {
  if (cb) {
    this.resume();
    if (this._questionCallback) {
      this.output.write('\n');
      this.prompt();
    } else {
      this._oldPrompt = this._prompt;
      this.setPrompt(query);
      this._questionCallback = cb;
      this.output.write('\n');
      this.prompt();
    }
  }
}