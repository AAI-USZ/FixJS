function( pkt ) {
            
            var name = pkt["cmd"];
            var cmds = null;
            for(var index in this.evt_chains) {
                
                cmds = this.evt_chains[index];
                
                if(cmds[0] != name)
                    continue;
                
                var sub = wsc_packet(pkt["body"]);
                name = name + '_' + sub["cmd"];
                
                if(cmds.length > 1 && sub["param"] != undefined) {
                    if(cmds[1] == sub["cmd"])
                        return name + '_' + sub["param"];
                }
            
            }
            
            return name;
        }