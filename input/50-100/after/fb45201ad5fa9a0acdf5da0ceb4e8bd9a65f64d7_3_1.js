function(authenticatorFn) {
        this.sessionHeader = null;
        this.SESSION_HEADER = 'App-Session';
        this.retryHandler = function(retryFn, errorFn){
            return function(jqXHR, statusText) {
                switch (jqXHR.status) {
                    case 401:
                        if (typeof authenticatorFn == 'function') {
                            authenticatorFn(retryFn);
                            break;
                        }
                    default: 
                        errorFn(jqXHR, statusText);
                }
            };
        };
    }