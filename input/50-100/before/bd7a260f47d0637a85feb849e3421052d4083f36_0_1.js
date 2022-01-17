function (result) {
      console.log();
      aResults.push([aTest.name + (sync ? ' - sync' : ' - async'), result.okN, result.failN, result.fatalN]);
      doTest(i + !sync, !sync);
    }