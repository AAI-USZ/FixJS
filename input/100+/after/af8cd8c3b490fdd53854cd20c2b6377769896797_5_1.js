function( e, data ) {
            if( data == '' )
                return;
            
            if( data[0] != '/' ) {
                if( !this.client.cchannel )
                    return;
            }
            
            data = (e.shiftKey ? '/npmsg ' : ( data[0] == '/' ? '' : '/say ' )) + data;
            data = data.slice(1);
            bits = data.split(' ');
            cmdn = bits.shift();
            ens = this.client.cchannel.info['namespace'];
            etarget = ens;
            
            if( bits[0] ) {
                hash = bits[0][0];
                if( (hash == '#' || hash == '@') && bits[0].length > 1 ) {
                    etarget = this.client.format_ns(bits.shift());
                }
            }
            
            arg = bits.join(' ');
            
            this.client.trigger('cmd.' + cmdn + '.wsc', {
                name: 'cmd',
                cmd: cmdn,
                args: arg,
                target: etarget,
                ns: ens
            });
        }