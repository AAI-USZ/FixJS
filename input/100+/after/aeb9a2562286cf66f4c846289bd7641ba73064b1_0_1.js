function(unused, operation) {
        this.getEl().unmask();
        console.log(operation);
        var message = 'Could not create delivery on the selected deadline.';
        var response = Ext.JSON.decode(operation.response.responseText);
        if(response && response.items.errormessages) {
            message = response.items.errormessages.join('. ');
        }
        Ext.MessageBox.show({
            title: 'Error',
            msg: message,
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.MessageBox.OK
        });
    }