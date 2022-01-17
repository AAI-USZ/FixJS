function( evt ) {
            this.client.trigger('connected.wsc', {name: 'connected', pkt: new WscPacket('connected\n\n')});
            //console.log("Connection opened");
            this.client.connected = true;
            this.client.handshake();
            this.client.attempts = 0;
        }