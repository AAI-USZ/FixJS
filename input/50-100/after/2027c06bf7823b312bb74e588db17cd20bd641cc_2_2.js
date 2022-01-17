function(libName) {
  this.parsePos = 0;
  libName = this.targetRootFS + libName;
  try {
    this.symbols = [os.system(this.nmExec, ['-n', '-f', libName], -1, -1), ''];
  } catch (e) {
    // If the library cannot be found on this system let's not panic.
    this.symbols = '';
  }
}