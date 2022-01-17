function(index) {
            var largest_id = 0;
            var empty_found = false;
            var name = $(this).attr('id');
            $('#' + name + ' input[name$="_mfkey"]').each(function(index) {
                    var match = $(this).attr('name').
                        match(/[a-z]*_([0-9]*)_mfkey/);
                    var id = parseInt(match[1]);
                    largest_id = Math.max(id, largest_id);
                    var key = $(this).val();
                    var value = $(this).next('input').val();
                    if (key == '' && value == '') {
                        if (empty_found) {
                            $(this).parent().remove();
                        }
                        else {
                            empty_found = true;
                        }
                    }
                });
            if (!empty_found) {
                var prefix = name + '_' + (largest_id + 1);
                var type_part;
                if ($(this).hasClass('string-only')) {
                    type_part = '<input type="hidden" name="' + prefix +
                        '_mftype" value="string"/>';
                } else {
                    type_part = '<select name="' + prefix +
                        '_mftype">' +
                        '<option value="string">String</option>' +
                        '<option value="number">Number</option>' +
                        '<option value="boolean">Boolean</option>' +
                        '</select>';
                }
                $(this).append('<p><input type="text" name="' + prefix +
                               '_mfkey" value=""/> = ' +
                               '<input type="text" name="' + prefix +
                               '_mfvalue" value=""/> ' + type_part + '</p>');
            }
        }