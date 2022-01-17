function(e) {
                    var reply = JSON.parse(e.data);

                    if(reply.status === 'OK') {
                        self.dispatched_callback(reply.host, reply.port);
                    } else if(reply.status === 'FULL') {
                        alert("BrowserQuest is currently at maximum player population. Please retry later.");
                    } else {
                        alert("Unknown error while connecting to BrowserQuest.");
                    }
                }