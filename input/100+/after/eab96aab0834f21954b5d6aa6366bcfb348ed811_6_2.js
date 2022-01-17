function testProcessing() {
  var testData = {
    'Default': [
      false, false, null,
      'tickprocessor-test.log', 'tickprocessor-test.default'],
    'SeparateIc': [
      true, false, null,
      'tickprocessor-test.log', 'tickprocessor-test.separate-ic'],
    'IgnoreUnknown': [
      false, true, null,
      'tickprocessor-test.log', 'tickprocessor-test.ignore-unknown'],
    'GcState': [
      false, false, TickProcessor.VmStates.GC,
      'tickprocessor-test.log', 'tickprocessor-test.gc-state']
  };
  for (var testName in testData) {
    print('=== testProcessing-' + testName + ' ===');
    driveTickProcessorTest.apply(null, testData[testName]);
  }
}