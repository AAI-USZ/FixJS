function(result) {
        var value = result.data('value');

        if (typeof(value)=='string' && isNaN(value) && value.match(/^http:/)) {
            $.ajax(this.autocompleteOptions.url, {
                async: false,
                type: 'post',
                data: {
                    'value': value,
                },
                success: function(text, jqXHR, textStatus) {
                    value = text;
                }
            });
        }

        return value;
    }