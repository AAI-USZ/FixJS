function testInvalidMode()
{
    debug("");
    debug("Verify that specifying an invalid mode raises an exception");
    evalAndExpectExceptionClass("db.transaction(['storeName'], 'lsakjdf')", "TypeError");
    testDegenerateNames();
}