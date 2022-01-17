function(pr) {
    var f;
    if (pr == null) {
      return puts(error("No program provided to dummy"));
    }
    return aliases('dummy', describe("I'am a dummy command that print some stuff", withEnv('foo', f = function(cb) {
      print(".".red);
      print(".".yellow);
      print(".".green);
      print(".".cyan);
      print(".".blue);
      puts(".");
      puts("a second line", 1);
      return console.log(logger.stack);
    })));
  }