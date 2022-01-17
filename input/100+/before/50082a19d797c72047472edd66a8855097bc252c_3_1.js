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