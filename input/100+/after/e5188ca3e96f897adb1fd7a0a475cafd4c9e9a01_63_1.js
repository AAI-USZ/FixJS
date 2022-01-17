function runTest()
{
    FBTest.sysout("cookies.test.issue60; START");

    FBTest.setPref("cookies.filterByPath", false);

    FBTest.openNewTab(basePath + "cookies/60/issue60.php", function(win)
    {
        FBTestFireCookie.enableCookiePanel(function(win)
        {
            var panelNode = FBTest.selectPanel("cookies").panelNode;

            var cookie = FBTestFireCookie.getCookieByName(panelNode, "TestCookie60[user]");

            // Open Modal edit cookie dialog.
            FBTestFireCookie.editCookie(cookie, function(dialog) {
                dialog.EditCookie.onOK();
            });

            // Verify the the following cookie doesn't exist. The cookie name must
            // not be escaped.
            var cookie = FBTestFireCookie.getCookieByName(panelNode, "TestCookie60%5Buser%5D");
            FBTest.ok(cookie == null, "Cookie name must not be escaped");

            FBTest.testDone("cookies.test.issue60; DONE");
        });
    });
}