function deleteExisting()
{
    self.trans = evalAndLog("trans = event.target.result");
    shouldBeNonNull("trans");
    trans.onabort = unexpectedAbortCallback;

    deleteAllObjectStores(db);

    evalAndLog("objectStore = db.createObjectStore('someObjectStore')");

    debug("");
    debug("Verify that specifying an invalid direction raises an exception:");
    evalAndExpectExceptionClass("objectStore.openCursor(0, 'invalid-direction')", "TypeError");
    debug("");

    self.nextToAdd = 0;
    addData();
}