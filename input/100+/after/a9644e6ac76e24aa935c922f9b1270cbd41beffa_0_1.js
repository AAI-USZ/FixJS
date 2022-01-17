function(operation) {
        var error = operation.getError();
        if(error === undefined) {
            return null;
        }
        var message;
        var url = operation.request.url;
        if(error.status === 0) {
            message = this._formatTpl(gettext('Could not connect to server at URL "{url}".'), {
                url: url
            });
        } else {
            message = this._formatTpl('The server responded with error message "{status}: {statusText}" when we did a {method}-request to URL "{url}".', {
                status: error.status,
                statusText: error.statusText,
                method: operation.request.method,
                url: operation.request.url
            });
        }
        return message;
    }