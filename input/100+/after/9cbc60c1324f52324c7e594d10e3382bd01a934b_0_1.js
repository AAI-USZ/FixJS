function updateLogRow(spy)
{
    updateTime(spy);

    if(spy.logRow)
    {
        var statusBox = spy.logRow.getElementsByClassName("spyStatus").item(0);
        statusBox.textContent = Firebug.Spy.XHR.getStatus(spy);
    }

    if (spy.loaded)
    {
        Css.removeClass(spy.logRow, "loading");
        Css.setClass(spy.logRow, "loaded");
    }

    if (spy.error || spy.aborted)
    {
        Css.setClass(spy.logRow, "error");
    }

    try
    {
        var errorRange = Math.floor(spy.xhrRequest.status/100);
        if (errorRange == 4 || errorRange == 5)
            Css.setClass(spy.logRow, "error");
    }
    catch (exc)
    {
    }
}