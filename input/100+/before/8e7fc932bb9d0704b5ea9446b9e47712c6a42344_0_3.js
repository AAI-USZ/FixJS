function() {
        var that = {},
            userId = Math.round(Math.random() * 10000000000000),
            callbacks = [],
            ws;

        that.sendMessage = function(data) {
            message = JSON.stringify({
                user: userId,
			    hash: location.hash,
                data: data
            })
            ws.send(message)
        }
        that.onMessage = function(callback) {
            callbacks.push(callback);
        }
        connect();
        function connect() {
            ws = new WebSocket('ws://r-w-x.org:8044/');
            ws.onclose = function(evt) {
                console.log('closed', evt)
                connect();
            }
            ws.onmessage = function(evt) {
                var data = JSON.parse(evt.data);
                if (data.user != userId && data.hash == location.hash) {
                    console.log('got message', data);
                    callbacks.forEach(function(callback) {
                        callback(data);
                    })
                }
            }
        }
        return that;
    }