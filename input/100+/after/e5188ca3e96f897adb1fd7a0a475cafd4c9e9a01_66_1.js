function runTest()
{
    FBTest.sysout("cookies.test.editCookies; START");

    FBTest.setPref("cookies.filterByPath", false);

    FBTest.openNewTab(basePath + "cookies/general/editCookies.php", function(win)
    {
        FBTestFireCookie.enableCookiePanel(function(win)
        {
            var panelNode = FBTest.selectPanel("cookies").panelNode;
            var cookie = FBTestFireCookie.getCookieByName(panelNode, "EditCookie3");

            editCookie(cookie);

            cookie = FBTestFireCookie.getCookieByName(panelNode, "EditCookie3");
            FBTest.compare("newvalue", cookie.cookie.value, "Check cookie value");
            FBTest.testDone("cookies.test.editCookies; DONE");
        });
    });
}