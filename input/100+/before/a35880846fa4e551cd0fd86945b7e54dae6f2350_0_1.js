function(evt) {
        if (evt.button != 0) return;
        evt.preventDefault();
        NewmanLib.ADR_STACK.push( {
            from: get_hashadr(''),
            to: get_hashadr($(this).attr('href')),
            selection_callback: $(Kobayashi.closest_loaded(this).container).data('selection_callback'),
            form_data: JSON.stringify({ data: $('.change-form').serializeArray() }),
            onsave: function(popped, action_table_obj) {
                if (!action_table_obj.vars.object_id) {
                    ADR_STACK = [];
                    log_lookup.log('Did not get ID of newly added object -- breaking ADR_STACK');
                    return;
                }
                popped.oid = action_table_obj.vars.object_id;
                popped.str = action_table_obj.vars.object_title;
            },
            onreturn: function(popped, action_table_obj) {
                $(document).one('content_added', function(evt) {
                    NewmanLib.restore_form(popped.form_data, $('.change-form'), {});
                });
                $(document).one('media_loaded', function(){popped.selection_callback(popped.oid,{str: popped.str});});
            }
        } );
        if (adr( $(this).attr('href'), {just_get: 'hash'} ) == location.hash) {
            Kobayashi.reload_content(Kobayashi.DEFAULT_TARGET);
        }
        else {
            adr( $(this).attr('href') );
        }
    }