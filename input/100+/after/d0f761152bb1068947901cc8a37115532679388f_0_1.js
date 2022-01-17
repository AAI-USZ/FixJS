function exit (async) {
    var leaked = Object.keys(global).filter(function (global) { return !~globals.indexOf(global); });
    if (leaked.length) {
      bailout("Variables leaked to global namespace.", leaked);
    }

    async(function (async) {
      if (!process.stdout.write('')) {
        process.stdout.once('drain', async());
      }
      if (!process.stderr.write('')) {
        process.stderr.once('drain', async());
      }
    }, function () {
      process.exit(passed == expected && actual == expected ? 0 : 1);
    });
  }