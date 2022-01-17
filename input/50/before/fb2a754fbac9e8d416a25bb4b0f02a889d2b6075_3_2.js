function log( message ) {
        if( typeof window.console !== undefined ) {
            window.console.log( message );
        } else {
            edward.messageLog.push( message );
        }
    }