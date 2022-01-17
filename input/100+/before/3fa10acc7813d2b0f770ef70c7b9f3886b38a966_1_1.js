function () {
    var externs = Object.create(null);
    var extArr = globals.concat(windowGlobals);
    extArr.forEach(function (x) {
      externs[x] = true;
    });
    return externs;
  }