function(win)
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
    }