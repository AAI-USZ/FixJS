function refreshRoles() {
        received_roles = false;
        $.ajax({
            url : 'v4/role',
            data : { users__id : my_userid, limit : 0, format : 'json' },
            accepts : 'application/json',
            success : receivedRoles,
            error : errorHandler(either(args, 'refreshRolesError', noop))
        });
    }