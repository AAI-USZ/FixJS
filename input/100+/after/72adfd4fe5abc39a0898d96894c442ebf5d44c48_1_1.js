function()
    {
        var values = this.core.promptInput('Credentials', [{label:"Credentials Name:",required:1,size:45}, {label:"AWS Access Key:",required:1,size:45}, {label:"AWS Secret Access Key:",type:'password',required:1,size:45}, {label:"Default Endpoint:",type:'menulist',empty:1,list:this.core.getEndpoints(),key:'url'}, {label:"Security Token:",multiline:true,rows:3,cols:45}]);
        if (!values) return;
        var cred = new Credential(values[0], values[1], values[2], values[3], values[4]);
        this.core.saveCredentials(cred);
        this.invalidate();
    }