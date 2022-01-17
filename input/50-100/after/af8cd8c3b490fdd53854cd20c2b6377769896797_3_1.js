function( ) {
            if( client.connected )
                return;
            
            this.attempts++;
            
            // Start connecting!
            if(CanCreateWebsocket()) {
                client.conn = client.createChatSocket();
                //console.log("connecting");
                client.trigger('start.wsc', new WscPacket('client connecting\ne=ok\n\n'));
            } else {
                client.monitor("Your browser does not support WebSockets. Sorry.");
                client.trigger('start.wsc', new WscPacket('client connecting\ne=no websockets available\n\n'));
            }
        }