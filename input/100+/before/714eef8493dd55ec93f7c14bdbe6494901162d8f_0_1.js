function(result) {
        var json = result.find('textarea').html();
        var data = $.parseJSON(json);

        var value = false;

        if (data.value) {
            value = data.value;
        } else {
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