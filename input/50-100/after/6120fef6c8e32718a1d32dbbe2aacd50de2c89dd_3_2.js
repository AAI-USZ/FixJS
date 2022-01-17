function(callback) {
            var failureCallback = loginFailure(callback),
                successCallback = function(response) {
                if (response.success) {
                    prepareSession(response);
                    if (indicator) indicator.hide();
                    if (typeof callback == 'function') callback();
                } else failureCallback();
            };
            return function(oauthInfo) {
                sf.prepareSessionFromOAuth(oauthInfo.accessToken, 
                                           oauthInfo.instanceUrl, 
                                           oauthInfo.identityUrl, 
                                           successCallback, failureCallback);
            }
        }