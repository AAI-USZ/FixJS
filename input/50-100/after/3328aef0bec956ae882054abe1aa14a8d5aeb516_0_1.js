function Logger_prepareFile() {
  var file = this.dir.clone();
  file.append(Date.now() + ".log");

  this._file = file;
  this._firstLog = true;
  this._writeAsync('[');
}