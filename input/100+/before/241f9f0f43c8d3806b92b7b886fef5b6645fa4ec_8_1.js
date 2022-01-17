function () {
        var url = "http://www.google.com";
        framework.start(url);
        expect(webview.onRequest).toHaveBeenCalledWith(jasmine.any(Function));
    }