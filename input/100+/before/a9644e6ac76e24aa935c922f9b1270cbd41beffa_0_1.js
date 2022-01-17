function(operation) {
        var error = operation.getError();
        if(error === undefined) {
            return null;
        }
        var message;
        if(error.status === 0) {
            message = 'Could not connect to server.';
        } else {
            message = Ext.String.format('{0}: {1}', error.status, error.statusText);
        }
        return message;
    }