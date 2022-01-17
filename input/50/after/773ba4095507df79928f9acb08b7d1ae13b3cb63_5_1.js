function(done) {
    var val = 45;

    gazel.dbName = "gazel" + new Date;

    setGet(done, 'foo', val, function(setRep, getRep) {
      return getRep === val;
    });
  }