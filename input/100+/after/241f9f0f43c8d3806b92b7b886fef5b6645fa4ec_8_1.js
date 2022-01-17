function () {
    beforeEach(function () {
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
    });

    it("can start a webview instance", function () {
        framework.start();
        expect(webview.create).toHaveBeenCalled();
    });

    it("on start passing callback and setting object parameters to create method of webview", function () {
        framework.start();
        expect(webview.create).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Object));
    });

    it("setting object should have debugEnabled to be defined", function () {
        framework.start();
        expect((webview.create.mostRecentCall.args)[1].debugEnabled).toBeDefined();
    });

    it("can start a webview instance with a url", function () {
        var url = "http://www.google.com";
        framework.start(url);
        expect(webview.setURL).toHaveBeenCalledWith(url);
    });

    it("can stop a webview instance", function () {
        framework.start();
        framework.stop();
        expect(webview.destroy).toHaveBeenCalled();
    });

}