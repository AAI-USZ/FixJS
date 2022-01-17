function UnixCppEntriesProvider(nmExec, targetRootFS) {
  this.symbols = [];
  this.parsePos = 0;
  this.nmExec = nmExec;
  this.targetRootFS = targetRootFS;
  this.FUNC_RE = /^([0-9a-fA-F]{8,16}) ([0-9a-fA-F]{8,16} )?[tTwW] (.*)$/;
}