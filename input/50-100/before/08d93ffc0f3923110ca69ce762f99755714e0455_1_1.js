function openKeyCursor(evt)
{
    event = evt;
    shouldBeEqualToString("event.target.result", "key2");

    self.request = evalAndLog("indexObject.openKeyCursor()");
    request.onsuccess = cursor1Continue;
    request.onerror = unexpectedErrorCallback;
}