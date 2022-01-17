function(accessToken, instanceUrl, userIdentityUrl, success, error, complete) {
        var url = getBaseUrl() + '/services/apexrest/oauth2/prepareSession';
        var data = 'accessToken=' + accessToken + '&instanceUrl=' + instanceUrl + '&identityUrl=' + userIdentityUrl;
        this.ajax('POST', url, data, success, error, complete);
    }