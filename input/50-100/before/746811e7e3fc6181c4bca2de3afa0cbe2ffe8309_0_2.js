function(e) {
            var val = $('input#searchfield').val();
            var fullname = $(item).data('fullname');
            if (val != '') {
                search_string = '';
            }
            else {
                search_string = fullname;
            }
            $('input#searchfield').val(search_string);
            qs.search(search_string)
            qs.cache();
            redraw_grid();
        }