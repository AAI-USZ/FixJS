function(code, signal) {
    var gitsha = buf.toString().trim();
    if (gitsha && gitsha.length === 7) {
      sha = gitsha;
      logger.info('code version (via git) is: ' + module.exports());
    } else {
      logger.warn('code version (randomly generated) is: ' + module.exports());
    }
  }