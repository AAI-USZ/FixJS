function(bodyWrap) {
        var errors = bodyWrap.getElementsByTagName("stream:error");
        if (errors.length === 0) {
            return;
        }
        var error = errors[0];
        var condition = error.childNodes[0].tagName;
        var text = error.getElementsByTagName("text")[0].textContent;
        Strophe.error("WebSocket stream error: " + condition + " - " + text);
        this._c._changeConnectStatus(Strophe.Status.CONNFAIL, condition);
        return Strophe.Status.CONNFAIL;
    }