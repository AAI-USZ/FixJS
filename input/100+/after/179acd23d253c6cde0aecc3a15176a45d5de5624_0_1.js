function(opts, callback) {
    if (opts.input == null) {
      opts.input = 'src';
    }
    if (opts.output == null) {
      opts.output = 'lib';
    }
    path.normalize(opts.input);
    path.normalize(opts.output);
    if (opts.test != null) {
      path.normalize(opts.test);
    }
    if (opts.silent) {
      stdout = function() {};
    }
    opts.requested = false;
    opts.callback = callback;
    info("input dir       : " + (String(opts.input).bold) + "\noutput dir      : " + (String(opts.output).bold) + "\njoin files to   : " + (String(opts.join).bold) + "\nminify          : " + (String(opts.minify).bold) + "\nbare            : " + (String(opts.bare).bold) + "\ndocs output dir : " + (String(opts.docs).bold) + "\ndocs template   : " + (String(opts.template).bold) + "\ntest directory  : " + (String(opts.test).bold) + "\nrun             : " + (String(opts.run).bold) + "\nsilent          : " + (String(opts.silent).bold));
    return Relay.serial(Relay.func(function() {
      if (opts.template != null) {
        return fs.readFile(opts.template, 'utf8', this.next);
      } else {
        return this.next();
      }
    }), Relay.func(function(err, template) {
      if (err != null) {
        throw err;
        this.skip();
      } else {
        opts.compiler = jade.compile(template, {
          filename: 'templates/docs.jade',
          pretty: true
        });
      }
      return this.next();
    }), Relay.func(function() {
      return startWatch(opts, this.next);
    }), Relay.func(function() {
      startCompile(opts);
      return this.next();
    })).start();
  }