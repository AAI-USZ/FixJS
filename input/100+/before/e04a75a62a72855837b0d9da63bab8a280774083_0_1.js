function()
    {
        var me = this;
        var item = this.getSelected();
        if (!item) return;
        var inputs = [ {label:"User name",type:"name",required:1,value:item.name},
                       {label:"Duration(sec)",type:"number",min:3600,max:3600*36} ];

        if (item.mfaDevices && item.mfaDevices.length) {
            inputs.push({label:"MFA Device:",type:"menulist",list:item.mfaDevices});
            inputs.push({label:"MFA Token Code"});
        }
        var values = this.core.promptInput('Create Temp Credentials', inputs);
        if (!values) return;
        var cred = this.core.findCredentials(values[0]);
        if (cred) {
            return alert('Credentials with name ' + values[0]  + ' already exist, please, choose another name');
        }

        this.core.api.getSessionToken(values[1], values[2], values[3], function(key) {
            me.core.saveTempKeys(me.core.getTempKeys().concat([ key ]));
            var cred = me.core.getActiveCredentials();
            cred = new Credential(values[0], key.id, key.secret, cred.url, key.securityToken, key.expire.getTime());
            me.core.saveCredentials(cred);
            me.core.selectTab('ew.tabs.credential');
        });
    }