function WindowsCppEntriesProvider(_ignored_nmExec, targetRootFS) {
  this.targetRootFS = targetRootFS;
  this.symbols = '';
  this.parsePos = 0;
}