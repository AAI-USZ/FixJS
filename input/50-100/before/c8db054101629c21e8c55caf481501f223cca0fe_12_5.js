function () {
            var webApp;
            log("INFO", "[PZP-"+ self.sessionId+"] Connection terminated from PZH");
            if (typeof self.sessionId !== "undefined") {
                self.messageHandler.removeRoute(self.config.pzhId, self.sessionId);
                if (self.config.pzhId) {
                    delete self.connectedPzh[self.config.pzhId];
                }
            }
            // TODO: Try reconnecting back to server but when.
        }