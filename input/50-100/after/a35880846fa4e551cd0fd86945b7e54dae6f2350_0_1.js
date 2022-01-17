function(popped, action_table_obj) {
                if (!action_table_obj.vars.object_id) {
                    ADR_STACK = [];
                    log_lookup.log('Did not get ID of newly added object -- breaking ADR_STACK');
                    return;
                }
                popped.oid = action_table_obj.vars.object_id;
                popped.str = action_table_obj.vars.object_title;
            }