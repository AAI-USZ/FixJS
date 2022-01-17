function() {
    var self = this;
    var done = self.async();
    var templateDir = this.file.src;
    var truncateFileCmd = '> ' +this.file.dest;
    var handlebarsCmd = __dirname + '/../node_modules/.bin/handlebars -m ' + templateDir + '/*.handlebars -f ' + this.file.dest;
    exec(truncateFileCmd +' && '+ handlebarsCmd, function(err, stdout, stderr) {
      if (err) {
        grunt.fail.fatal(stderr);
      }
      done();
    });
  }