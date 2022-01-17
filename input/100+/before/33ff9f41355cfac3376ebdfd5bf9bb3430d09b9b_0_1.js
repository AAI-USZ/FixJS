function(message) {
            var data, action;
        
            if(this.isListening) {
                if(this.useBison) {
                    data = BISON.decode(message);
                } else {
                    data = JSON.parse(message);
                }

                log.debug("data: " + message);

                if(data instanceof Array) {
                    if(data[0] instanceof Array) {
                        // Multiple actions received
                        this.receiveActionBatch(data);
                    } else {
                        // Only one action received
                        this.receiveAction(data);
                    }
                }
            }
        }