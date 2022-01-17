function receivedLoginCredentials(data, textStatus, jqXHR) {
        my_userid = data.user_id;
        my_user = '/ga_bigboard/v4/user/' + data.user_id + '/'; // "/ga_bigboard/v4/user/1/"
        room = data.room;

        $.ajax({
            async : false,
            url : 'v4/role',
            data : { users__id : my_userid, limit : 0, format : 'json' },
            accepts : 'application/json',
            success : receivedRoles,
            error : errorHandler(either(args, 'refreshRolesError', noop)),
            beforeSend : function(xhr) { xhr.setRequestHeader('Authorization', hash)}
        });

        if(debug) { console.log("succesfully logged in"); }
        either(args, 'loginSuccessful', noop)(data, textStatus, jqXHR);
    }