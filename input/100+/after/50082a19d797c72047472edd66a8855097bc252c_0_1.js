function doTest(i, sync) {
  if(i < aTestData.length) {
    var aTest = aTestData[i];
    lXapianTesting.runTests(aTest.name + (sync ? ' - sync' : ' - async'), aTest.tests, sync, function (result) {
      console.log();
      aResults.push([aTest.name + (sync ? ' - sync' : ' - async'), result.okN, result.failN, result.fatalN]);
      doTest(i + !sync, !sync);
    });
    return;
  }
  console.log('Summary: ok fail fatal   name');
  for (var ir = 0; ir < aResults.length; ir++) {
    console.log(aResults[ir][1]+' '+aResults[ir][2]+' '+aResults[ir][3]+'   '+aResults[ir][0]);
  }
}