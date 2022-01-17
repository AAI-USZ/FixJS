function (button, e, options) {
        Util.logoutUser();
        localStorage.removeItem('basicAuthHeader');
        localStorage.removeItem('privileges');
        localStorage.removeItem('Username');
        localStorage.removeItem('loggedInUser');
        window.location.hash = 'Login';
        Ext.getCmp('mainView').setActiveItem(0);
        var logconfirm = this.parent.getComponent('LogoutConfirmPanel');
        logconfirm.hide();
    }