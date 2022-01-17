function(e) {
            var val = $('#searchfield').val();
            var fullname = $(item).data('fullname');
            if (val != '') {
                search_string = '';
            }
            else {
                search_string = fullname;
            }
            $('#searchfield').val(search_string);
            $('#searchfield').trigger('input');
        }