function openws() {
    var ws;

    if ("WebSocket" in window) {
        ws = new WebSocket(ws_addr);
    } else {
        ws = new MozWebSocket(ws_addr);
    }

    ws.onopen = function() {
        tries_count = 0;
    }
    ws.onclose = reopenws;
    /*ws.onerror = function() {
        if (ws.readyState == ws.OPEN) {
            ws.close()
        }
        reopenws();
    }*/
    ws.onmessage = onmessage;

    return ws;
}