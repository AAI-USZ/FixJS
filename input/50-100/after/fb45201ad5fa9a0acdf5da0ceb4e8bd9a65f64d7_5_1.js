function(callback) {
            if (sessionAlive)
                callback();
            else {
                authenticate(callback);
                SalesforceOAuthPlugin.getLoginDomain(function(val) { loginHostUrl = val.toLowerCase(); });
                if (!sf) sf = new sforce.Client(authenticate);
            }
        }