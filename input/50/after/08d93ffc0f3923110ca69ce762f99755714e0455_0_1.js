function advanceBadly()
    {
        cursor = event.target.result;

        evalAndExpectExceptionClass("cursor.advance(0)", "TypeError");
        testDelete();
    }