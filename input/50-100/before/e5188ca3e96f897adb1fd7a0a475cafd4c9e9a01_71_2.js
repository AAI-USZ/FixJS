function onMutateAttr(callback, win, id, attr, value)
{
    FBTest.progress("onMutateAttr " + id);

    var mutateId = win.document.getElementById(id);
    waitForHtmlMutation(null, value ? "span" : "div",
        value ? mutateId.firstChild : mutateId, callback);

    if (value)
        mutateId.firstChild.setAttribute(attr, value);
    else
        mutateId.firstChild.removeAttribute(attr);

    FBTest.click(win.document.getElementById(id + "Button"));
}