function doTest(i, sync) {
  if(i >= aAllTestFiles.length) {
    console.log('Summary: ok fail fatal   name');
    for (var ir = 0; ir < aResults.length; ir++) {
      console.log(aResults[ir][1]+' '+aResults[ir][2]+' '+aResults[ir][3]+'   '+aResults[ir][0]);
    }
    return;
  }
  var aTest = require('./' + aAllTestFiles[i])
  xapiantesting.runTests(aTest.name + (sync ? ' - sync' : ' - async'), aTest.tests, sync, function (ok, fail, fatal) {
    console.log();
    aResults.push([aTest.name + (sync ? ' - sync' : ' - async'), ok, fail, fatal]);
    doTest(i + !sync, !sync);
  });
}