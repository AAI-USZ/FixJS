function( evt ) {
            console.log(evt);
            this.client.trigger('closed.wsc', {name: 'closed', pkt: new WscPacket('connection closed\n\n')});
            
            if(this.client.connected) {
                this.client.monitorAll("Connection closed");
                this.client.connected = false;
            } else {
                this.client.monitorAll("Connection failed");
            }
            
            // For now we want to automatically reconnect.
            // Should probably be more intelligent about this though.
            if( this.client.attempts > 2 ) {
                this.client.monitorAll("Can't connect. Try again later.");
                this.client.attempts = 0;
                return;
            }
            
            this.client.monitorAll("Connecting in 5 seconds...");
            setTimeout(this.client.connect.bind(this.client), 5000);
        
        }