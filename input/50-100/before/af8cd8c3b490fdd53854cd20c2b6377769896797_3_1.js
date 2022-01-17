function( ) {
            if( client.connected )
                return;
            // Start connecting!
            if(CanCreateWebsocket()) {
                client.conn = client.createChatSocket();
                //console.log("connecting");
                client.trigger('start.wsc', wsc_packet('client connecting\ne=ok\n\n'));
            } else {
                client.monitor("Your browser does not support WebSockets. Sorry.");
                client.trigger('start.wsc', wsc_packet('client connecting\ne=no websockets available\n\n'));
            }
        }