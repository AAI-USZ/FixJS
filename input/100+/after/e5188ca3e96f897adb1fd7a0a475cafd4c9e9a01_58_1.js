function runTest()
{
    FBTest.sysout("cookies.test.issue34; START");

    FBTest.setPref("cookies.filterByPath", false);

    FBTest.openNewTab(basePath + "cookies/34/issue34.php", function(win)
    {
        FBTestFireCookie.enableCookiePanel(function(win)
        {
            var panelNode = FBTest.selectPanel("cookies").panelNode;
            var cookie = FBTestFireCookie.getCookieByName(panelNode, "TestCookie34");

            editCookie(cookie);

            cookie = FBTestFireCookie.getCookieByName(panelNode, "TestCookie34");
            FBTest.compare("ValueCookie34-modified", cookie.cookie.value, "Check new cookie value");
            FBTest.testDone("cookies.test.issue34; DONE");
        });
    });
}