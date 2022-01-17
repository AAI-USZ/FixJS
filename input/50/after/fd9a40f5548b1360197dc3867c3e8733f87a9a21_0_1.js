function flag ( errorType ) {
        if (typeof errorType !== 'undefined') {
            window.location.hash = errorStringBase + '=' + errorType;
        }
    }