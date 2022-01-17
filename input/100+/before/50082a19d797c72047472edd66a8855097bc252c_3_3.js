function (name, tests, sync, callback) {
  console.log(name);
  var objects = {};
  var okN = 0, failN = 0, fatalN = 0;
  runTest(0);
  function runTest(tstN) {
    if (tstN == tests.length) { 
      if (callback) callback(okN, failN, fatalN);
      return; 
    }
    var aTst = tests[tstN];
    function fNext(result, name, extra) {
      var aStr;
      switch (result) {
      case 'ok':    aStr = '  ok    '; okN++;    break;
      case 'fail':  aStr = '  fail  '; failN++;  break;
      case 'fatal': aStr = '  fatal '; fatalN++; break;
      }
      aStr += aTst.name;
      if (extra) 
        aStr += ' - ' + extra;
      console.log(aStr);
      if (result == 'fatal') {
        if (callback) callback(okN, failN, fatalN);
      } else
        runTest(tstN + 1);
    }
    if ('action' in aTst) {
      try {
       aTst.action(objects, sync, function(err) {
          if (err)
            fNext(aTst.fatal ? 'fatal' : 'fail', aTst.name, aTst.fatal ? err : undefined);
          else 
            fNext('ok', aTst.name);
        });
      } catch (ex) {
        fNext(aTst.fatal ? 'fatal' : 'fail', aTst.name, aTst.fatal ? ex.message : undefined);
      }
    } else {
      if (sync) {
        var aResult, aErr = null;
        try {
          aResult = objects[aTst.obj][aTst.method].apply(objects[aTst.obj], aTst.parameters);
        } catch (ex) {
          aErr = ex.message;
        }
        aTst.result(aErr, aResult, function(result) {
          fNext(result ? 'ok' : 'fail', aTst.name);
        });
      } else {
        aTst.parameters.push(function(err, result){
          aTst.result(err, result, function(result) {
            aTst.parameters.pop();
            fNext(result ? 'ok' : 'fail', aTst.name);
          });
        });
        try {
          objects[aTst.obj][aTst.method].apply(objects[aTst.obj], aTst.parameters);
        } catch (ex) {
          aTst.result(ex.message, null, function(result) {
            fNext(result ? 'ok' : 'fail', aTst.name);
          });
        }
      }
    }
  }
}