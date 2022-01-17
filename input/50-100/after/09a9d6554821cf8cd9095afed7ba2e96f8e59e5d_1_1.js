function(popped, action_table) {
                $(document).one('content_added', function(evt) {
                    NewmanLib.restore_form(popped.form_data, $('.change-form'), {});
                });
                if (popped.oid) {
                    $(document).one('media_loaded', function() {
                        popped.selection_callback(popped.oid,{str: popped.str});
                    });
                }
            }