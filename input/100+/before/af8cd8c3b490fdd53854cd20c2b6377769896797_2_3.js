function( e ) {
        
            u = channel.client.settings['username'].toLowerCase();
            msg = e['message'].toLowerCase();
            p = channel.window.find('p.logmsg').last();
            
            if( msg.indexOf(u) < 0 || p.html().toLowerCase().indexOf(u) < 0 )
                return;
            
            p.addClass('highlight');
        
        }