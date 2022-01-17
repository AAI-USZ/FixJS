function( e ) {
            info = wsc_packet('user ' + e.user + '\n' + e['*info']);
            channel.registerUser( info );
            channel.setUserList();
        }