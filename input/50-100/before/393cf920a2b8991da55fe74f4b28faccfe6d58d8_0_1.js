function(selectedUsers) {
        var confirmMessage = gettext('Do you really want to remove the {numselected} selected users from the list?');
        Ext.MessageBox.show({
            title: gettext('Confirm remove'),
            msg: Ext.create('Ext.XTemplate', confirmMessage).apply({
                numselected: selectedUsers.length
            }),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            fn: function(buttonId) {
                if(buttonId == 'yes') {
                    this.removeUsers(selectedUsers);
                }
            },
            scope: this
        });
    }