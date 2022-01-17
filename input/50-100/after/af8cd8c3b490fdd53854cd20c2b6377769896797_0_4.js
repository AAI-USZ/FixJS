function( e ) {
            pack = new WscPacket(e.pkt["body"]);
            this.info['members'] = {};
            
            while(pack["cmd"] == "member") {
                this.registerUser(pack);
                pack = new WscPacket(pack.body);
                if(pack == null)
                    break;
            }
            //console.log("registered users");
            this.setUserList();
        }