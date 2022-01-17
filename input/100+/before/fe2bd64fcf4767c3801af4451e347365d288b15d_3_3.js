function(action_type){
        var data = getSelected();
        if (data['id_list'].length === 0){
            return;
        }
        if (action_type == 'delete'){
            msg = ngettext('Delete this notification?',
					'Delete these notifications?', data['id_list'].length);
            if (confirm(msg) === false){
                return;
            }
        }
        if (action_type == 'close'){
            msg = ngettext('Close this entry?',
                    'Close these entries?', data['id_list'].length);
            if (confirm(msg) === false){
                return;
            }
        }
        if (action_type == 'remove_flag'){
            msg = ngettext('Remove all flags on this entry?',
                    'Remove all flags on these entries?', data['id_list'].length);
            if (confirm(msg) === false){
                return;
            }
        }
        if (action_type == 'delete_post'){
            msg = ngettext('Delete this entry?',
                    'Delete these entries?', data['id_list'].length);
            if (confirm(msg) === false){
                return;
            }
        }
        submit(data['id_list'], data['elements'], action_type);
    }