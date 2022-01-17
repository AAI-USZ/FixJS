function( client ) {
            this.client = client;
            this.mapper['recv'] = this.map_recv;
            this.tablumps = new WscTablumps();
            
            if ( this.client.settings['tablumps'] !== null ) {
                lumpmap = this.client.settings['tablumps']();
                this.client.view.extend(lumpmap, this.tablumps.lumps);
                this.tablumps.registerMap( lumpmap );
            }
            
            //client.bind("data.wsc", this.debug_pkt);
            client.bind('chatserver.wsc', this.chatserver);
            client.bind('dAmnServer.wsc', this.chatserver);
            client.bind('login.wsc', this.login);
            client.bind('join.wsc', this.join);
            client.bind('part.wsc', this.part);
            //client.bind('kicked.wsc', this.kicked);
            client.bind('ping.wsc', this.ping);
            client.bind('property.wsc', this.property);
            client.bind('recv_join.wsc', this.recv_joinpart);
            client.bind('recv_part.wsc', this.recv_joinpart);
            client.bind('recv_msg.wsc', this.recv_msg);
            client.bind('recv_action.wsc', this.recv_msg);
            client.bind('recv_privchg.wsc', this.recv_privchg);
            client.bind('recv_kicked.wsc', this.recv_kicked);
        }