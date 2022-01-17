function flag ( errorType ) {
        if (typeof errorType !== 'undefined') {
            window.location.hash = errorHash + errorType;
        }
    }