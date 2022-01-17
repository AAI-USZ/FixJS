function( evt ) {
            this.client.trigger('connected.wsc', {name: 'connected', pkt: wsc_packet('connected\n\n')});
            //console.log("Connection opened");
            this.client.connected = true;
            this.client.handshake();
        }