function() {

            /*
             * `apiURL` serves as a way to override the API URL regardless of any other setting.
             */
            return StackMob['apiURL'] || 
            (StackMob['fullURL'] ? 
            (StackMob['apiVersion'] === 0 ? StackMob
            .getDevAPIBase()
            : StackMob.getProdAPIBase())
            : (window.location.protocol + '//'
            + window.location.hostname + (window.location.port ? ':'
            + window.location.port : '')) + '/');
        }