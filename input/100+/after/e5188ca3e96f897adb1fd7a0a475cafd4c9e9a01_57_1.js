function runTest()
{
    FBTest.sysout("cookies.test.issue25; START");

    FBTest.setPref("cookies.filterByPath", false);

    FBTest.openNewTab(basePath + "cookies/25/issue25.php", function(win)
    {
        FBTestFireCookie.enableCookiePanel(function(win) 
        {
            var cookie = null;
            var panelNode = FBTest.selectPanel("cookies").panelNode;

            cookie = FBTestFireCookie.getCookieByName(panelNode, "TestCookie25");
            if (!verifyCookie(cookie))
                return testDone();

            editCookie(cookie, true);

            cookie = FBTestFireCookie.getCookieByName(panelNode, "TestCookie25");
            FBTest.ok(!cookie.cookie.expires, "Must be Session cookie now.");

            cookie = FBTestFireCookie.getCookieByName(panelNode, "TestCookie25");
            if (!verifyCookie(cookie))
                return testDone();

            editCookie(cookie, false);

            cookie = FBTestFireCookie.getCookieByName(panelNode, "TestCookie25");
            FBTest.ok(cookie.cookie.expires, "Must not be Session cookie now. " +
                cookie.cookie.expires);

            cookie = FBTestFireCookie.getCookieByName(panelNode, "TestCookie25");
            if (!verifyCookie(cookie))
                return testDone();

            return testDone("cookies.test.issue25; DONE");
        });
    });
}