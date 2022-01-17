function (messageObj){
            if(messageObj.sessionId == null){
                console.log("Wrong begin message" + JSON.stringify(messageObj));
                this.close();
                return;
            }
            var existingOultet = thisAdaptor.connectedOutlets[messageObj.sessionId];
            if( existingOultet != null){
                console.log("Disconnecting already connected session " + JSON.stringify(messageObj));
                existingOultet.close(); //disconnect the other client,may be is hanging..
            }

            thisAdaptor.connectedOutlets[messageObj.sessionId] = this;

            this.sessionId = messageObj.sessionId;
            this.currentExecute = this.executeButNotAuthenticated;
            this.redisClient = redis.createClient(thisAdaptor.redisPort,thisAdaptor.redisHost);
            this.redisClient.subscribe(this.sessionId);
            this.redisClient.on("message",this.onChannelNewMessage.bind(this));

            outlet.waitingMsg = messageObj;;
            this.redisClient.on("connect",function(){
                this.executeButNotAuthenticated(this.waitingMsg);
            }.bind(this));
        }