function openKeyCursor(evt)
{
    event = evt;
    shouldBeEqualToString("event.target.result", "key2");

    debug("");
    debug("Verify that specifying an invalid direction raises an exception:");
    evalAndExpectExceptionClass("indexObject.openKeyCursor(0, 'invalid-direction')", "TypeError");
    debug("");

    self.request = evalAndLog("indexObject.openKeyCursor()");
    request.onsuccess = cursor1Continue;
    request.onerror = unexpectedErrorCallback;
}