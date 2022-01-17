function advanceBadly()
    {
        cursor = event.target.result;

        evalAndExpectException("cursor.advance(0)", "IDBDatabaseException.TYPE_ERR");
        testDelete();
    }