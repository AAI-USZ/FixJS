function join(room, username, password) {
        room_name = room;
        my_username = username;
        my_password = password;

        $.ajax({
            url : 'join',
            data : { username: my_username, password: my_password, room : room_name },
            accepts : 'application/json',
            success : receivedLoginCredentials,
            error : errorHandler(either(args, 'failedLogin', noop))
        });

    }