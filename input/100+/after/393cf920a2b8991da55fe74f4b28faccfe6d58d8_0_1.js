function(combo, userRecord) {
        var username = userRecord.get('username');
        if(this.store.findExact('username', username) == -1) {
            this.saveMask();
            this.addUser(userRecord);
        } else {
            Ext.MessageBox.show({
                title: gettext('Already in list'),
                msg: gettext('The selected user is already in the list'),
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR,
                fn: function() {
                    Ext.defer(function() {
                        this._clearAndfocusAddUserField();
                    }, 100, this);
                },
                scope: this
            });
        }
    }