function exit () {
    var leaked = Object.keys(global).filter(function (global) { return !~globals.indexOf(global); });
    if (leaked.length) {
      bailout("Variables leaked to global namespace.", leaked);
    }
    process.exit(passed == expected && actual == expected ? 0 : 1);
  }