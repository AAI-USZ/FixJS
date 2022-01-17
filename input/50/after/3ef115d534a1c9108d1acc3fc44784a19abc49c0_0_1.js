function() {
                this.emit('subscribe_ready');
                if(this.callback) { 
                    process.nextTick(this.callback);
                }
            }