function (username) {
        Ext.Ajax.setTimeout(Util.getTimeoutLimit());
        Ext.Ajax.request({
            scope: this,
            withCredentials: true,
            useDefaultXhrHeader: false,
            url: HOST + '/ws/rest/v1/user?q=' + username,
            method: 'GET',
            headers: Util.getBasicAuthHeaders(),
            success: this.storeUserPrivileges,
            failure: function () {
                Ext.getCmp('mainView').setMasked(false);
                Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.controller.session.alert'));
            }
        });
    }