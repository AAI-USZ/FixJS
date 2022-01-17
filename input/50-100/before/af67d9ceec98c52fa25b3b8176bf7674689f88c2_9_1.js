function done(value) {
    var expected = (24 + 3) * 200 + 19900 + 20100 + 39800;
    if (value == expected)
        testPassed("done() called with " + expected);
    else
        testFailed("done() called with " + value + ", but expected " + expected);
    layoutTestController.notifyDone();
}