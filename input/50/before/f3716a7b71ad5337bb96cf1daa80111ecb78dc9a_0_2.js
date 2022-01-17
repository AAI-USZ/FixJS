function(response, o) {
            alert(string.substitute(this.requestErrorText, [response, o]));
            ErrorManager.addError(response, o, this.options, 'failure');
        }