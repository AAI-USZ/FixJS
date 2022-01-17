function(addr) {
            debug.info('got output websocket address:' + addr);
            sck = new WebSocket(addr);
            debug.info("opening output socket at",addr,sck);
            sck.onopen = function (e) {
                debug.info('output socket opened',e);
            };
            sck.onclose = function (e) {
                debug.info('output socket closed',e);
            };
            sck.onmessage = function(e) {
                debug.info('output socket message:',e);
                updateHistory(e.data);
            };            
        }