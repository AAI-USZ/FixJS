function (error, build) {
    if (error) return self.emit('error', error);

    // store build object and emit ready
    self.build = build;

    // add router source code to moduleSource object
    fs.readFile(self.get('router'), 'utf8', function (error, content) {
      if (error) return self.emit('error', error);

      // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
      // because the buffer-to-string conversion in `fs.readFile()`
      // translates it to FEFF, the UTF-16 BOM.
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }

      // store router source code
      build.moduleSource.router = content;

      // create Module constructor
      self.build.Module = compileModule(this);

      // create Main module
      var main = self.build.main = this.build.Module('module.js');

      // compile router module
      var router = main.require('router');
      self.build.router = new router();

      // emit ready event
      self.emit('ready');
    });
  }