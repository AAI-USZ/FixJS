function() {
  var Logger, blue, color, colors, cyan, debug, error, fatal, green, info, inverse, logger, magenta, missing, neatBroken, notOutsideNeat, prefix, print, puts, red, warn, yellow;

  Logger = require('./logger');

  try {
    colors = require('colors');
  } catch (e) {
    console.log("Can't find colors module\n\nRun cake install to install the dependencies.");
  }

  logger = new Logger;

  color = function(str, color) {
    if (str[color] != null) {
      return str[color];
    } else {
      return str;
    }
  };

  blue = function(str) {
    return color(str, 'blue');
  };

  cyan = function(str) {
    return color(str, 'cyan');
  };

  green = function(str) {
    return color(str, 'green');
  };

  inverse = function(str) {
    return color(str, 'inverse');
  };

  magenta = function(str) {
    return color(str, 'magenta');
  };

  red = function(str) {
    return color(str, 'red');
  };

  yellow = function(str) {
    return color(str, 'yellow');
  };

  puts = function(str, level) {
    if (level == null) {
      level = 0;
    }
    return logger.log("" + str + "\n", level);
  };

  print = function(str, level) {
    if (level == null) {
      level = 0;
    }
    return logger.log(str, level);
  };

  prefix = function(string, prefix) {
    return "" + prefix + " " + string;
  };

  fatal = function(string) {
    return puts(prefix(string, inverse(red(" FATAL ", logger.FATAL))));
  };

  error = function(string) {
    return puts(prefix(string, inverse(red(" ERROR ", logger.ERROR))));
  };

  warn = function(string) {
    return puts(prefix(string, inverse(yellow(" WARN ", logger.WARN))));
  };

  info = function(string) {
    return puts(prefix(string, inverse(green(" INFO ", logger.INFO))));
  };

  debug = function(string) {
    return puts(prefix(string, inverse(blue(" DEBUG ", logger.DEBUG))));
  };

  missing = function(path) {
    return red("" + path + " can't be found.");
  };

  neatBroken = "Your Neat installation is probably broken.";

  notOutsideNeat = function(s) {
    return error(red("Can't run " + s + " outside of a Neat project."));
  };

  module.exports = {
    blue: blue,
    cyan: cyan,
    debug: debug,
    error: error,
    green: green,
    info: info,
    inverse: inverse,
    logger: logger,
    magenta: magenta,
    missing: missing,
    neatBroken: neatBroken,
    notOutsideNeat: notOutsideNeat,
    prefix: prefix,
    print: print,
    puts: puts,
    red: red,
    warn: warn,
    yellow: yellow
  };

}