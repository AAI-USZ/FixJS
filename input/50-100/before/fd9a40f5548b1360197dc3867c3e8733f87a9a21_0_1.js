function read () {
        var hashError, hashErrorIndex;
        
        // check url hash for error message
        hashError = window.location.hash.toString().replace(/#/, '');
        hashErrorIndex = hashError.indexOf(errorHash);
        if (hashErrorIndex != -1) {
            // get error type
            errorCurrent.type = hashError.replace(/error=/i, '');
            
            // set error state
            errorState = true;
        }
    }