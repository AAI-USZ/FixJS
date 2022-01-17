function(e) {
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
                }