function (arg) {
        if (arg) {
            // store items
            USER.name = Ext.getCmp('username').getValue();
            var pass = Ext.getCmp('password').getValue();
            if (USER.name === '' || pass === '') {
                Ext.Msg.alert("Error", "Please fill in all fields")
            } else {
                //this.saveBasicAuthHeader(USER.name,pass);
                this.loginContinue();
            }
        } else {
            // exit the program
            this.doExit();
        }
    }