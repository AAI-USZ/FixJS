function callbackOrEvent( event, args ) {
                if( _.isFunction( callback ) ) {
                    if( event == 'error' ) {
                        callback( args );
                    } else {
                        callback( null, args );
                    }
                } else {
                    self.emit( event, args );    
                }
            }