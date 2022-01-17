function() {
            actions_in_progress[$(this).attr('data-pending-action-id')] = getActionType($(this));
            packages_in_progress[$.trim($(this).find('td.package_name').html())] = true;
        }