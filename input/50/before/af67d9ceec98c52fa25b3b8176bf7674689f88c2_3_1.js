function finishJSTest()
{
    wasFinishJSTestCalled = true;
    if (!window.wasPostTestScriptParsed)
        return;
    shouldBeTrue("successfullyParsed");
    debug('<br /><span class="pass">TEST COMPLETE</span>');
    if (window.jsTestIsAsync && window.layoutTestController)
        layoutTestController.notifyDone();
}