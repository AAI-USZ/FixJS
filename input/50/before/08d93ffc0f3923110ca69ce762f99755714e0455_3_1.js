function testInvalidMode()
{
    debug("");
    debug("Verify that specifying an invalid mode raises an exception");
    evalAndExpectException("db.transaction(['storeName'], 'lsakjdf')", "IDBDatabaseException.TYPE_ERR", "'TypeError'");
    testDegenerateNames();
}