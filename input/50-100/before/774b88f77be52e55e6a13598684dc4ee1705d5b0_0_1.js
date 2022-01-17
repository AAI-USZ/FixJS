function (success, fail, args, env) {
        var value;

        _webview = _util.requireWebview();

        if (args) {
            value = JSON.parse(decodeURIComponent(args["sandbox"]));
            _webview.setSandbox(JSON.parse(value));

            if (success) {
                success();
            }
        } else {
            value = _webview.getSandbox();
            success(value === "1"); // always return "0" or "1" even after explicitly setting value to true or false
        }
    }