function onMutateNode(callback, win, id)
{
    FBTest.progress("onMutateNode " + id);

    var counter = 0;
    function done()
    {
        if (++counter == 2)
            callback();
    }

    var mutateId = win.document.getElementById(id);
    waitForHtmlMutation(null, "div", mutateId.parentNode, done);
    waitForHtmlMutation(null, "div", null, done);

    FBTest.click(win.document.getElementById(id + "Button"));
}