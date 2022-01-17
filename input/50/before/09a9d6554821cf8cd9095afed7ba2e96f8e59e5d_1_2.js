function(popped, action_table_obj) {
                if (!action_table_obj.vars.object_id) {
                    log_lookup.log('Did not get ID of newly added object -- not selecting added object');
                }
                else {
                    popped.oid = action_table_obj.vars.object_id;
                    popped.str = action_table_obj.vars.object_title;
                }
            }