function( evt ) {
            console.log(evt);
            this.client.trigger('closed.wsc', {name: 'closed', pkt: wsc_packet('connection closed\n\n')});
            this.client.monitorAll("Connection closed");
            
            if(this.client.connected)
                this.client.connected = false;
            
            // For now we want to automatically reconnect.
            // Should probably be more intelligent about this though.
            this.client.connect();
        
        }