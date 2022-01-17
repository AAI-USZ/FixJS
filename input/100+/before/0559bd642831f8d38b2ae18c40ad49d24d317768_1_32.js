function(){
        var selected = $(this).find(':selected').clone();
        var selected_value = selected.attr('value');
        if (selected_value == 'OTHER') {
            guess_dom0(query, function(hvlist){
                if (typeof(hvlist[0]) != 'undefined') {
                    if ( select.children('option[value='+hvlist[0].host.oid+']').size() < 1 ) {
                        select_foot.before( hv_to_option(hvlist[0]) );
                    }
                    select.val( hvlist[0].host.oid ).change();
                    select.show().attr('disabled',false);
                    resultbox.hide().attr('disabled',true);
                    $(e).hide().attr('disabled',true);
                }
            });
        }
        else {
            if ( select.children('option[value='+selected_value+']').size() < 1 ) {
                select_foot.before( selected );
            }
            select.val(selected_value).change();
            select.show().attr('disabled',false);
            resultbox.hide().attr('disabled',true);
            $(e).hide().attr('disabled',true);
        }
    }