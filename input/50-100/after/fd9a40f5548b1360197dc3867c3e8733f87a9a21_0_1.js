function read () {
        var hashError, hashErrorIndex;
        
        // check url hash for error message
        hashError = window.location.hash.toString().replace( /#/, '', 1 );
        hashErrorIndex = hashError.indexOf( errorStringBase );
        if (hashErrorIndex != -1) {
            // get error type
            errorCurrent.type = hashError.replace( errorStringBase + '=', '', 1 );
            
            // set error state
            errorState = true;
        }
    }