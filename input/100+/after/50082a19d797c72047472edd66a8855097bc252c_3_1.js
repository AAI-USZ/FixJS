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