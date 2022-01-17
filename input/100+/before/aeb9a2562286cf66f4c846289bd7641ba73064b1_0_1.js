function(x) {
        this.getEl().unmask();
        Ext.Msg.alert('Error', 'Could not create delivery on the selected deadline.'); // TODO: Check status code for permission denied.
    }