function onMutateText(callback, win, id, inline)
{
    FBTest.progress("onMutateTest " + id);

    var mutateId = win.document.getElementById(id);
    waitForHtmlMutation(null, inline ? "span" : "div", mutateId, callback);

    FBTest.click(win.document.getElementById(id + "Button"));
}