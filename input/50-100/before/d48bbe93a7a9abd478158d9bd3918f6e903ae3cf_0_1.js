function() {
        if (ws.readyState == ws.OPEN) {
            ws.close()
        }
        reopenws();
    }