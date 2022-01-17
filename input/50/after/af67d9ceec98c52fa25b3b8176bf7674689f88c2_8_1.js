function done(value) {
    var expected = 5770500;
    if (value == expected)
        testPassed("done() called with " + expected);
    else
        testFailed("done() called with " + value + ", but expected " + expected);
    testRunner.notifyDone();
}