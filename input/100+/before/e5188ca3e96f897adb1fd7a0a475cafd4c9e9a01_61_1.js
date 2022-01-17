function(win)
    {
        FBTestFireCookie.enableCookiePanel(function(win)
        {
            var panelNode = FBTest.selectPanel("cookies").panelNode;

            var cookie = FBTestFireCookie.getCookieByName(panelNode, "TestCookie45");

            // Open Modal edit cookie dialog.
            FBTestFireCookie.editCookie(cookie, function(dialog) {
                dialog.EditCookie.onOK();
            });

            // Verify the the following cookie doesn't exist. The cookie name must
            // not be escaped.
            cookie = FBTestFireCookie.getCookieByName(panelNode, "TestCookie45");
            FBTest.compare("aaa+bbb", cookie ? cookie.cookie.value : "",
                "Cookie value must be still the same");

            FBTest.testDone("cookies.test.issue45; DONE");
        });
    }