function( name, packet ) {
            var args = { 'name': name, 'pkt': packet, 'ns': this.client.mns };
        
            if( !this.maps[name] )
                return args;
            
            mapping = this.maps[name];
            cmd = packet.cmd;
            
            if( this.mapper[cmd] )
                this.mapper[cmd](args, packet, mapping);
            else
                this.mapPacket(args, packet, mapping);
            
            return args;
            
        }