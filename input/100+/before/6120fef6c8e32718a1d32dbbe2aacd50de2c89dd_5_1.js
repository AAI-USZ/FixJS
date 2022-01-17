function authenticate(onSuccess) {
    
        var indicator, oauthProperties, loginSuccess, loginFailure;
        indicator = $j(document).showActivityInd('Authenticating...', false);
    
        oauthProperties = new OAuthProperties(remoteAccessConsumerKey, 
                                                  oauthRedirectURI, 
                                                  ['api'], true, true);
                                                  
        loginSuccess = function(callback) {
            var successCallback = function(response) {
                if (response.success) {
                    prepareSession(response);
                    indicator.hide();
                    if (typeof callback == 'function') callback();
                } else loginFailure();
            };
            return function(oauthInfo) {
                sf.prepareSessionFromOAuth(oauthInfo.accessToken, 
                                           oauthInfo.instanceUrl, 
                                           oauthInfo.identityUrl, 
                                           successCallback, loginFailure);
            }
        }
        
        // Error callback on login process failure method.
        loginFailure = function(result) {
            SFHybridApp.logError("loginFailure: " + result);
            indicator.hide();
            var errorMsg = 'Authentication failed. Do you want to retry?';
            if (confirm(errorMsg)) ManageUserSession.initialize(onSuccess);
        }
        
        SalesforceOAuthPlugin.authenticate(loginSuccess(onSuccess), loginFailure, oauthProperties);
        $j(document).off('salesforceSessionRefresh').on('salesforceSessionRefresh', function(event) {
            (loginSuccess())(event.originalEvent.data);
        });
    }