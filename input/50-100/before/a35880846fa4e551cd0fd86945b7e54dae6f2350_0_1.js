function(popped, action_table_obj) {
                $(document).one('content_added', function(evt) {
                    NewmanLib.restore_form(popped.form_data, $('.change-form'), {});
                });
                $(document).one('media_loaded', function(){popped.selection_callback(popped.oid,{str: popped.str});});
            }