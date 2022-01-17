function() {
                if (!($(this).data('uri') == $(this).val())) {
                    var value = $(this).val();
                    $(this).data('uri', value);
                    $(this).data('label', value);
                    $(this).data('hasLabel', false);
                }
                if ($(this).data('hasLabel')) {
                    $(this).val($(this).data('label'))
                       .removeClass('resource-autocomplete-uri')
                       .addClass('resource-autocomplete-uri-name');
                }
            }