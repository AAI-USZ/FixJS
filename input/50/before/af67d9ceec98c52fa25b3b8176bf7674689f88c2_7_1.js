function finishJSTest()
{
    wasFinishJSTestCalled = true;
    if (!self.wasPostTestScriptParsed)
        return;
    isSuccessfullyParsed();
    if (self.jsTestIsAsync && self.layoutTestController)
        layoutTestController.notifyDone();
}