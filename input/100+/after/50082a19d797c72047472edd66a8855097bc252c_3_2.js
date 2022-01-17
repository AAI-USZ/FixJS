function runTest(tstN) {
    if (tstN == tests.length) { 
      if (callback) callback(aTstSummary);
      return; 
    }
    var aTst = tests[tstN];
    function fNext(result, name, extra) {
      var aStr;
      switch (result) {
      case 'ok':    aStr = '  ok    '; aTstSummary.okN++;    break;
      case 'fail':  aStr = '  fail  '; aTstSummary.failN++;  break;
      case 'fatal': aStr = '  fatal '; aTstSummary.fatalN++; break;
      }
      aStr += aTst.name;
      if (extra) 
        aStr += ' - ' + extra;
      console.log(aStr);
      if (result == 'fatal') {
        if (callback) callback(aTstSummary);
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
      if (!sync)
        aTst.parameters.push(function(err, result){
          aTst.result(err, result, function(result) {
            aTst.parameters.pop();
            fNext(result ? 'ok' : 'fail', aTst.name);
          });
        });
      var aResult, aErr = null;
      try {
        aResult = objects[aTst.obj][aTst.method].apply(objects[aTst.obj], aTst.parameters);
      } catch (ex) {
        aErr = ex.message;
      }
      if (sync || aErr) {
        aTst.result(aErr, aResult, function(result) {
          fNext(result ? 'ok' : 'fail', aTst.name);
        });
      }
    }
  }