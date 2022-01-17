function( e ) {
            info = new WscPacket('user ' + e.user + '\n' + e['*info']);
            channel.registerUser( info );
            channel.setUserList();
        }