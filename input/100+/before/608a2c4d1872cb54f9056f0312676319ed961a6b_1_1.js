function ScriptArgument(text, prefix, suffix) {
  this.text = text !== undefined ? text : '';
  this.prefix = prefix !== undefined ? prefix : '';
  this.suffix = suffix !== undefined ? suffix : '';

  while (this.text.charAt(0) === ' ') {
    this.prefix = this.prefix + ' ';
    this.text = this.text.substring(1);
  }

  while (this.text.charAt(this.text.length - 1) === ' ') {
    this.suffix = ' ' + this.suffix;
    this.text = this.text.slice(0, -1);
  }
}