function() {
    var self = this;
    var done = self.async();
    var templateDir = this.file.src;

    var handlebarsCmd = __dirname + '/../node_modules/.bin/handlebars -m ' + templateDir + '/*.handlebars -f ' + this.file.dest;
    exec(handlebarsCmd, done);
  }