function (name, args) {
        _webview.executeJavascript("webworks.event.trigger('" + name + "', '" + JSON.stringify(args) + "')");
    }