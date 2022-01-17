function()
    {
        var me = this;
        var item = this.getSelected();
        if (!item) return;
        this.core.api.createVirtualMFADevice(item.name, null, function(obj) {
            var png = "data:image/png;base64," + obj.qrcode;
            values = me.core.promptInput('Activate MFA device', [{label:"Serial",value:obj.id,type:'label'}, {label:"QRCode",value:png,type:'image',fixed:true,minheight:300,maxheight:300,minwidth:300,maxwidth:300,height:300,width:300}, {label:"Secret Key",value:obj.seed,type:'label'}, {label:"Auth Code 1",required:1}, {label:"Auth Code 2",required:1}]);
            if (!values) return;
            this.core.api.enableMFADevice(item.name, obj.id, values[3], values[4], function() {
                item.mfaDevices = null;
                me.selectionChanged();
            });
        });
    }