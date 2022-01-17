function(oauthInfo) {
                sf.prepareSessionFromOAuth(oauthInfo.accessToken, 
                                           oauthInfo.instanceUrl, 
                                           oauthInfo.identityUrl, 
                                           successCallback, loginFailure);
            }