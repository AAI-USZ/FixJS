function _formMessage(url, origin, sid, body) {
    var tokens = url.split("blackberry/")[1].split("/"),
        //Handle the case where the method is multi-level
        finalToken = (tokens[3] && tokens.length > 4) ? tokens.slice(3).join('/') : tokens[3];

    return {
        request : {
            params : {
                service : tokens[0],
                action : tokens[1],
                ext : tokens[2],
                method : (finalToken && finalToken.indexOf("?") >= 0) ? finalToken.split("?")[0] : finalToken,
                args : (finalToken && finalToken.indexOf("?") >= 0) ? finalToken.split("?")[1] : null
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