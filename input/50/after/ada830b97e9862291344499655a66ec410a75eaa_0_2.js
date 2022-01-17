function () {
  this.cursor.bg.red().black().bold();
  this._write('ERROR');
  this.cursor.reset();
  this._write(' ');
}