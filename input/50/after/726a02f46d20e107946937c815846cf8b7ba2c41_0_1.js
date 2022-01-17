function (name) {
        //Change arguments into a real array instead of a fake one
        var args = Array.prototype.slice.call(arguments);
        //Send all the arguments as JSON
        _webview.executeJavascript("webworks.event.trigger('" + name + "', '" + JSON.stringify(args.slice(1)) + "')");
    }