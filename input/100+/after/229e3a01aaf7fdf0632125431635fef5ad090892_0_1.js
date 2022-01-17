function(dispatcherMode) {
            var url = "ws://"+ this.host +":"+ this.port +"/",
                self = this;
            console.log("Connecting to websocket at "+url);
            log.info("Trying to connect to server : "+url);

            if(window.MozWebSocket) {
                this.connection = new MozWebSocket(url);
            } else {
                this.connection = new WebSocket(url);
            }
            
            if(dispatcherMode) {
                this.connection.onmessage = function(e) {
                    console.log("ws message: "+e);
                    var reply = JSON.parse(e.data);

                    if(reply.status === 'OK') {
                        self.dispatched_callback(reply.host, reply.port);
                    } else if(reply.status === 'FULL') {
                        alert("BrowserQuest is currently at maximum player population. Please retry later.");
                    } else {
                        alert("Unknown error while connecting to BrowserQuest.");
                    }
                };
            } else {
                this.connection.onopen = function(e) {
                    log.info("Connected to server "+self.host+":"+self.port);
                };

                this.connection.onmessage = function(e) {
                    console.log("ws msg: "+e.data);
                    if(e.data === "go") {
                        if(self.connected_callback) {
                            self.connected_callback();
                        }
                        return;
                    }
                    if(e.data === 'timeout') {
                        self.isTimeout = true;
                        return;
                    }
                    
                    self.receiveMessage(e.data);
                };

                this.connection.onerror = function(e) {
                    log.error(e, true);
                };

                this.connection.onclose = function() {
                    log.debug("Connection closed");
                    $('#container').addClass('error');
                    
                    if(self.disconnected_callback) {
                        if(self.isTimeout) {
                            self.disconnected_callback("You have been disconnected for being inactive for too long");
                        } else {
                            self.disconnected_callback("The connection to BrowserQuest has been lost");
                        }
                    }
                };
            }
        }