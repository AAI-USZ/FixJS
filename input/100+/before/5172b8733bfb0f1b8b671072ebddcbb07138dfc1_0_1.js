function(i, e){
            var c = $(this).prev()
            , g = $(this).closest('.control-group');
            g.removeClass('error');
            if (typeof c.attr('name') === 'undefined'){
                c = c.find('input');
            }
            if (c.val() === '') {
                $(this).closest('.control-group').addClass('error');
                be = false;
            }
            return true;
        }