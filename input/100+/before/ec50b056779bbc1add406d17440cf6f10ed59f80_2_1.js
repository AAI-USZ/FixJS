function loadBlacklist() {
  var file = this.context.file = __dirname + '/blacklist.txt';
  try {
    this.context.blacklist = fs.readFileSync(file, 'utf8')
      .split('\n')
      .filter(function (w) { return w; });
  } catch (e) {
    this.context.log.info('Failed to load blacklist.txt', e.stack);
    this.context.blacklist = [];
  }
}