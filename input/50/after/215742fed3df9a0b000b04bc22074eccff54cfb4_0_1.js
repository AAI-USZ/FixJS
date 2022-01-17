function (arg) {
        var active = Ext.getCmp('viewPort').getActiveItem().getActiveItem();
        // console.log(active);
        if (arg) {
            if (active === 0) {
                this.doLogin(true);
            }
        } else {
            
        }
    }