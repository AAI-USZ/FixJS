function () {
        var privileges = localStorage.getItem("privileges");
        var allModules = Util.getModules();
        var userModules = [];
        //starting at index=1 here, don't need app button for 'login'
        for(i=1;i<allModules.length;i++){
        	//checking if user is allows to view the module
            if(privileges.indexOf('RaxaEmrView '+allModules[i])!==-1){
            	userModules[userModules.length] = allModules[i];
            }
        }
        Ext.getCmp('appGrid').addModules(userModules);
        //if only 1 app available, send to that page
        if(userModules.length === 1){
            window.location = userModules[0];
        }
        //if no apps available, alert the user
        else if(userModules.length === 0){
        	Ext.Msg.alert("No Privileges Found", "Contact your system administrator")
        }
        //otherwise show the AppGrid
        else{
            this.showDashboard();
        }
    }