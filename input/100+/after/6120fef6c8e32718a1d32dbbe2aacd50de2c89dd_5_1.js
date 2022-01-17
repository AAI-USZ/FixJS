function authenticate(onSuccess, showSpinner) {
    
        var indicator, oauthProperties, loginSuccess, loginFailure;
    
        if (showSpinner) 
            indicator = $j(document).showActivityInd('Authenticating...', false);

        oauthProperties = new OAuthProperties(remoteAccessConsumerKey, 
                                                  oauthRedirectURI, 
                                                  ['api'], false, false);
                                                  
        // Error callback on login process failure method.
        loginFailure = function(callback) {
            return function() {
                if (indicator) indicator.hide();
                var errorMsg = 'Authentication failed. Do you want to retry?';
                if (confirm(errorMsg)) authenticate(callback);
            }
        }

        loginSuccess = function(callback) {
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
        
        SalesforceOAuthPlugin.authenticate(loginSuccess(onSuccess), loginFailure(onSuccess), oauthProperties);
        $j(document).off('salesforceSessionRefresh').on('salesforceSessionRefresh', function(event) {
            (loginSuccess())(event.originalEvent.data);
        });
    }