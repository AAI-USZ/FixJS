function openObjectCursor(evt)
{
    event = evt;
    shouldBeNull("event.target.result");

    debug("");
    debug("Verify that specifying an invalid direction raises an exception:");
    evalAndExpectExceptionClass("indexObject.openCursor(0, 'invalid-direction')", "TypeError");
    debug("");

    self.request = evalAndLog("indexObject.openCursor()");
    request.onsuccess = cursor2Continue;
    request.onerror = unexpectedErrorCallback;
}