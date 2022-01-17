function (username, password) {
        // delete existing logged in sessions
        Ext.Ajax.request({
            url: MRSHOST + '/ws/rest/v1/session',
            withCredentials: true,
            useDefaultXhrHeader: false,
            method: 'DELETE',
            success: function () {}
        })
        // check login and save to localStorage if valid
        Ext.Ajax.request({
            url: MRSHOST + '/ws/rest/v1/session',
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic " + window.btoa(username + ":" + password)
            },
            success: function (response) {
                CONNECTED = true;
                var authenticated = Ext.decode(response.responseText).authenticated;
                if (authenticated) {
                    localStorage.setItem("basicAuthHeader", "Basic " + window.btoa(username + ":" + password));
                    helper.loginContinue();
                } else {
                    localStorage.removeItem("basicAuthHeader");
                    Ext.Msg.alert("Error", "Please try again")
                }
            },
            failure: function (response) {
                CONNECTED = false;
                // hash user/pass
                var hashPass = 'Basic ' + window.btoa(username + ":" + password);
                var hashStored = localStorage.getItem('basicAuthHeader');
                // compare hashPass to hashStored
                if (hashPass === hashStored) {
                    helper.loginContinue();
                } else {
                    Ext.Msg.alert("Error", "Please try again")
                }
            }
        })
    }