function deleteExisting()
{
    self.trans = evalAndLog("trans = event.target.result");
    shouldBeNonNull("trans");
    trans.onabort = unexpectedAbortCallback;

    deleteAllObjectStores(db);

    self.objectStore = evalAndLog("db.createObjectStore('someObjectStore')");
    self.nextToAdd = 0;
    addData();
}