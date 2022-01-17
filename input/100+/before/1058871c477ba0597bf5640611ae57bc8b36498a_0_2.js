function (userInfo) {
        var userInfoJson = Ext.decode(userInfo.responseText);
        if (userInfoJson.results.length !== 0) {
            Ext.Ajax.setTimeout(Util.getTimeoutLimit());
            Ext.Ajax.request({
                scope: this,
                url: userInfoJson.results[0].links[0].uri + '?v=full',
                method: 'GET',
                withCredentials: true,
                useDefaultXhrHeader: false,
                headers: Util.getBasicAuthHeaders(),
                success: function (response) {
                    var privilegesJson = Ext.decode(response.responseText);
                    //only adding necessary fields for localStorage
                    var privilegesArray = [];
                    for (i = 0; i < privilegesJson.privileges.length; i++) {
                        privilegesArray[i] = {
                            'name': privilegesJson.privileges[i].name,
                            'description': privilegesJson.privileges[i].description
                        };
                    }
                    localStorage.setItem("privileges", Ext.encode(privilegesArray));
                    this.loginSuccess();
                },
                failure: function () {
                    Ext.getCmp('mainView').setMasked(false);
                    Ext.Msg.alert("RaxaEmr.controller.session.alert");
                }
            });
        } else {
            // showing modal alert and stop loading mask
            Ext.Msg.alert("RaxaEmr.controller.session.usernamealert");
            this.launchAfterAJAX();
        }
    }