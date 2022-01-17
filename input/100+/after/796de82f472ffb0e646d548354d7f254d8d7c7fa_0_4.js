function () {
        var username = Ext.getCmp('userName').getValue();
        localStorage.setItem("Username", username);

        if (username === "") {
            Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.controller.session.blankusername'))
            return;
        }

        var password = Ext.getCmp('passwordID').getValue();
        if (password === "") {
            Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.controller.session.blankpassword'))
            return;
        }

        //passing username & password to saveBasicAuthHeader which saves Authentication
        //header as Base64 encoded string of user:pass in localStore
        Util.saveBasicAuthHeader(username, password);

        //splash loading screen, mask on 'mainview'
        Ext.getCmp('mainView').setMasked({
            xtype: 'loadmask',
            message: 'Loading'
        });

        // check for user name validity and privileges
        this.getUserPrivileges(username);
        //populating views with all the modules, sending a callback function
        Startup.populateViews(Util.getModules(), this.launchAfterAJAX);
    }