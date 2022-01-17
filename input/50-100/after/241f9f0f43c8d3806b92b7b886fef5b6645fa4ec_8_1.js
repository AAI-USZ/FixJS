function () {
        GLOBAL.qnx = {
            callExtensionMethod : function () {
                return 42;
            }
        };
        webview = util.requireWebview();
        spyOn(webview, "create").andCallFake(function (done) {
            done();
        });
        spyOn(webview, "destroy");
        spyOn(webview, "executeJavascript");
        spyOn(webview, "setURL");
        spyOn(console, "log");
    }