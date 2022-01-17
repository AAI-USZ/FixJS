function( e ) {
            
            if(e.pkt["arg"]["e"] == "ok") {
                //protocol.client.monitor("Logged in as " + e.pkt["param"] + '.');
                // Use the username returned by the server!
                info = wsc_packet('info\n' + e.data);
                protocol.client.settings["username"] = e.pkt["param"];
                protocol.client.settings['symbol'] = info.arg.symbol;
                protocol.client.settings['userinfo'] = info.arg;
                // Autojoin!
                // TODO: multi-channel?
                if ( protocol.client.fresh )
                    protocol.client.join(client.settings["autojoin"]);
                else {
                    for( key in protocol.client.channelo ) {
                        if( protocol.client.channelo[key].info['namespace'][0] != '~' )
                            protocol.client.join(key);
                    }
                }
            } else {
                //protocol.client.monitor("Failed to log in: \"" + e.pkt["arg"]["e"] + '"');
            }
            
            if( protocol.client.fresh )
                protocol.client.fresh = false;
            
            
        }