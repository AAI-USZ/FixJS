function () {
        var privileges = localStorage.getItem("privileges");
        var allModules = Util.getModules();
        var userModules = [];
        var allApps = Util.getApps();
        //starting at index=1 here, don't need app button for 'login'
        for (i = 1; i < allModules.length; i++) {
            //checking if user is allows to view the module
            /*below check is commented to start login work temporarily
            it is commented because check was failing as privileges were deleted from role_privileges
            in the database so as to make the view POSTs successful
            */
            //            if(privileges.indexOf('RaxaEmrView '+allModules[i])!==-1){
            userModules[userModules.length] = allModules[i];
            //            }
        }
        Ext.getCmp('appGrid').addModules(userModules);
        Ext.getCmp('smartApp').addApps(allApps);
        //if only 1 app available, send to that page
        if (userModules.length === 1) {
            window.location = userModules[0];
        }
        //if no apps available, alert the user
        else if (userModules.length === 0) {
            Ext.Msg.alert("No Privileges Found", "Contact your system administrator")
        }
        //otherwise show the AppGrid
        else {
            this.showDashboard();
        }
    }