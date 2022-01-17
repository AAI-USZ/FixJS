function(pr) {
    var f;
    if (pr == null) {
      return error("No program provided to dummy");
    }
    return aliases('dummy', describe("I'am a dummy command that print some stuff", withEnv('foo', f = function(cb) {
      print(".".red, 0);
      print(".".yellow, 1);
      print(".".green, 2);
      print(".".cyan, 3);
      print(".".blue, 4);
      puts(".");
      puts("a second line", 1);
      return console.log(logger.stack);
    })));
  }