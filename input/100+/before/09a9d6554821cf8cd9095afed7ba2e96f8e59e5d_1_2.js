function($) {
    function default_adrstack_push_callback(evt) {
        if (evt.button != 0) return;
        evt.preventDefault();
        
        var onsave_callback, onreturn_callback;
        if ($(this).is('.js-custom-adrstack-callbacks')) {
            // Define no callbacks
        }
        else {
            onsave_callback = function(popped, action_table_obj) {
                if (!action_table_obj.vars.object_id) {
                    log_lookup.log('Did not get ID of newly added object -- not selecting added object');
                }
                else {
                    popped.oid = action_table_obj.vars.object_id;
                    popped.str = action_table_obj.vars.object_title;
                }
            };
            onreturn_callback = function(popped, action_table_obj) {
                $(document).one('content_added', function(evt) {
                    NewmanLib.restore_form(popped.form_data, $('.change-form'), {});
                });
                if (popped.oid) {
                    $(document).one('media_loaded', function(){
                        popped.selection_callback(popped.oid,{str: popped.str});
                    });
                }
            };
        }
        
        NewmanLib.ADR_STACK.push( {
            from: get_hashadr(''),
            to: get_hashadr($(this).attr('href')),
            selection_callback: $(Kobayashi.closest_loaded(this).container).data('selection_callback'),
            form_data: JSON.stringify({ data: $('.change-form').serializeArray() }),
            onsave: onsave_callback,
            onreturn: onreturn_callback
        } );
        
        if (adr( $(this).attr('href'), {just_get: 'hash'} ) == location.hash) {
            Kobayashi.reload_content(Kobayashi.DEFAULT_TARGET);
        }
        else {
            adr( $(this).attr('href') );
        }
    }
    $('.js-adrstack-push').live('click', default_adrstack_push_callback);
    /*$('.js-adrstack-push.js-custom-adrstack-callbacks.js-multi-upload').live('click', function(evt) {
        // FIXME: Add all the mass-uploaded photos to the gallery.
        // Would have to collect photo IDs from mass_upload.html
        // and write custom onsave and onreturn callbacks. #27
    });*/
}