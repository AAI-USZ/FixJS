function(uri)
    {
        var cmdPopupBrowser = this.getElementById("fbCommandPopupBrowser");

        var doc1 = panelBar1.browser.contentDocument;
        var doc2 = panelBar2.browser.contentDocument;
        var doc3 = cmdPopupBrowser.contentDocument;

        Css.appendStylesheet(doc1, uri);
        Css.appendStylesheet(doc2, uri);
        Css.appendStylesheet(doc3, uri);

        if (FBTrace.DBG_INITIALIZE)
            FBTrace.sysout("chrome.appendStylesheet; " + uri);
    }