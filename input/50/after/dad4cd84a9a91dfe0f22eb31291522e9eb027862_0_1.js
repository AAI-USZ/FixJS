function(form, record, success) {
        if (success) {
            Ext.Msg.alert('Success', 'Company has been updated.');
        } else {
            Ext.Msg.alert('Failure', 'Company has not been updated.');
        }
    }