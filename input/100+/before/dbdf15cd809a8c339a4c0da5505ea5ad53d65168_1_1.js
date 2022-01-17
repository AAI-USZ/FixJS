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
        window.location.hash = 'Dashboard';
        Ext.getCmp('mainView').setActiveItem(1);
    }