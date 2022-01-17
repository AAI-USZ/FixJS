function update_multifields() {
    $('.multifield').each(function(index) {
            var largest_id = 0;
            var empty_found = false;
            var name = $(this).attr('id');
            $('input[name$="_mfkey"]').each(function(index) {
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
                $(this).append('<p><input type="text" name="' + name + '_' +
                               (largest_id + 1) +
                               '_mfkey" value=""/> = ' +
                               '<input type="text" name="' + name + '_' +
                               (largest_id + 1) +
                               '_mfvalue" value=""/></p>');
            }
        });
}