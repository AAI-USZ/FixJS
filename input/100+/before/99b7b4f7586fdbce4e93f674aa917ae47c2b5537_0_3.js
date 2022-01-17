function () {
        var name = Ext.getCmp('userName').getValue();
        if (name === "") {
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
        this.getUserPrivileges(name);

        //populating views with all the modules, sending a callback function
        Startup.populateViews(Util.getModules(), this.launchAfterAJAX);
    }