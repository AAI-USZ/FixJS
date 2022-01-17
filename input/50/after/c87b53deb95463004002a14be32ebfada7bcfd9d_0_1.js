function (views) {
        //remove loading mask
        if(!Util.basicAuthHeader){
        Ext.getCmp('mainView').setMasked(false);
    }}