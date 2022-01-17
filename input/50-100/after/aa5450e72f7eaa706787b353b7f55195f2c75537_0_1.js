function(choice) {
        var value = choice.data('value');

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

            choice.data('value', value);
        }

        return value;
    }