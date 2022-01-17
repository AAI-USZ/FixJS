function()
    {
        var me = this;
        var item = this.getSelected();
        if (!item) return;
        var values = this.core.promptInput('Activate MFA device', [{label:"Serial Number",required:1}, {label:"Auth Code 1",required:1}, {label:"Auth Code 2",required:1}]);
        if (!values) return;
        this.core.api.enableMFADevice(item.name, values[0], values[1], values[2], function() {
            item.mfaDevices = null;
            me.selectionChanged();
        });
    }