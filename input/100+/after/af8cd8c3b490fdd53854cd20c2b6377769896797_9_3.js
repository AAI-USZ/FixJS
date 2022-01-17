function( arguments, pkt, mapping ) {
            for(i in mapping) {
                if( mapping[i] == null)
                    continue;
                
                key = mapping[i];
                skey = key;
                switch(i) {
                    // e.<map[event][0]> = pkt.param
                    case "0":
                        arguments[key] = pkt['param'];
                        break;
                    // for n in map[event][1]: e.<map[event][1][n]> = pkt.arg.<map[event][1][n]>
                    case "1":
                        for( n in mapping[1] ) {
                            key = mapping[1][n];
                            if( key instanceof Array ) {
                                arguments[key[1]] = pkt['arg'][key[0]];
                                skey = key[1];
                            } else {
                                k = key[0] == '*' ? key.slice(1) : key;
                                arguments[key] = pkt['arg'][k] || '';
                                skey = key;
                            }
                        }
                        break;
                    // e.<map[event][2]> = pkt.body
                    case "2":
                        if( key instanceof Array )
                            this.mapPacket(arguments, new WscPacket(pkt['body']), key);
                        else
                            arguments[key] = pkt['body'];
                        break;
                }
                
                if( skey[0] != '*' )
                    continue;
                
                k = skey.slice(1);
                arguments[k] = this.tablumps.parse( arguments[skey] );
            }
        }