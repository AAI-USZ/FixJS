function( e ) {
            pack = wsc_packet(e.pkt["body"]);
            this.info['members'] = {};
            
            while(pack["cmd"] == "member") {
                this.registerUser(pack);
                pack = wsc_packet(pack.body);
                if(pack == null)
                    break;
            }
            //console.log("registered users");
            this.setUserList();
        }