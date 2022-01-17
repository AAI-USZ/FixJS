function _formMessage(url, origin, sid, body) {
    var tokens = url.split("blackberry/")[1].split("/");

    return {
        request : {
            params : {
                service : tokens[0],
                action : tokens[1],
                ext : tokens[2],
                method : tokens[3] && tokens[3].indexOf("?") >= 0 ? tokens[3].split("?")[0] : tokens[3],
                args : tokens[3] && tokens[3].indexOf("?") >= 0 ? tokens[3].split("?")[1] : null
            },
            body : body,
            origin : origin
        },
        response : {
            send : function (code, data) {
                var responseText;
                if (typeof(data) === 'string') {
                    responseText = data;
                } else {
                    responseText =  JSON.stringify(data);
                }

                _webview.notifyOpen(sid, code, "OK");
                _webview.notifyHeaderReceived(sid, "Access-Control-Allow-Origin", "*");
                _webview.notifyDataReceived(sid, responseText, responseText.length);
                _webview.notifyDone(sid);
            }
        }
    };
}