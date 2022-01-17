function (err, result) {
      if (!err) {
        console.log();
        aResults.push([aTest.name + (sync ? ' - sync' : ' - async'), result.okN, result.failN, result.fatalN]);
      }
      doTest(i + !sync, !sync);
    }