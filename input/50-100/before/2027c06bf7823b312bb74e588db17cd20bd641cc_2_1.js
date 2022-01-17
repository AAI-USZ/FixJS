function(libName) {
  this.parsePos = 0;
  try {
    this.symbols = [
      os.system(this.nmExec, ['-C', '-n', '-S', libName], -1, -1),
      os.system(this.nmExec, ['-C', '-n', '-S', '-D', libName], -1, -1)
    ];
  } catch (e) {
    // If the library cannot be found on this system let's not panic.
    this.symbols = ['', ''];
  }
}