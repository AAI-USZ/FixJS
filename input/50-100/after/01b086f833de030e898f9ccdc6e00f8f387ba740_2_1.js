function(accessToken, instanceUrl, userIdentityUrl, success, error, complete) {
        var url = getBaseUrl() + '/services/apexrest/oauth2/prepareSession',
            data = 'accessToken=' + accessToken + '&instanceUrl=' + instanceUrl + '&identityUrl=' + userIdentityUrl;
        this.sessionHeader = null;
        this.ajax('POST', url, data, success, error, complete);
    }