function openObjectCursor(evt)
{
    event = evt;
    shouldBeNull("event.target.result");

    self.request = evalAndLog("indexObject.openCursor()");
    request.onsuccess = cursor2Continue;
    request.onerror = unexpectedErrorCallback;
}