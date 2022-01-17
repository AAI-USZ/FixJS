function(result) {
        var value = result.data('value');

        if (value.match(/^http:/)) {
            $.ajax(this.autocompleteOptions.url, {
                async: false,
                type: 'post',
                data: {
                    'result': json,
                },
                success: function(text, jqXHR, textStatus) {
                    value = text;
                }
            });
        }

        return value;
    }