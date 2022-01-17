function (url) {
        // Set up the controller WebView
        controllerWebView.init(config);
        
        webview.create(function () {
            // Workaround for executeJavascript doing nothing for the first time
            webview.executeJavascript("1 + 1");

            url = url || config.content;
            // Start page
            if (url) {
                webview.setURL(url);
            }

            // Define application events callbacks which get invoked by native code
            registerApplicationEvents();
        },
        {
            debugEnabled : config.debugEnabled
        });

        overlayWebView.create(function () {
            overlayWebView.setURL("local:///ui-resources/ui.html");
        });
    }