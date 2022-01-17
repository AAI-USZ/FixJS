function(popped, action_table) {
                if (!action_table.vars.object_id) {
                    log_lookup.log('Did not get ID of newly added object -- not selecting added object');
                }
                else {
                    popped.oid = action_table.vars.object_id;
                    popped.str = action_table.vars.object_title;
                }
            }