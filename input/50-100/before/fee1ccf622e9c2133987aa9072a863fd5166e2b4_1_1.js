function () {
            if(!this.isClosed){
                console.log("Closing outlet " + this.sessionId)
                if(this.redisClient != null){
                    this.redisClient.quit();
                }
                delete thisAdaptor.connectedOutlets[this.sessionId];
                this.socket.destroy();
                this.isClosed = true;
            }
        }