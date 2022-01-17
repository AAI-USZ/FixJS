function( evt ) {
            var pack = new WscPacket(evt.data);
            
            if(pack == null)
                return;
            
            var event = this.client.event_name(pack);
            // Uncomment if you want everything ever in the console.
            //console.log(event + '.wsc');
            //console.log(JSON.stringify(pack));
            pevt = this.packetEvent(event, pack);
            this.log(pevt);
            this.client.trigger('data.wsc', pevt);
            this.client.trigger(event + '.wsc', pevt);
            //this.monitor(data);
        }