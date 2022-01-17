function refreshRoom() {
        received_room = false;
        $.ajax({
            url : 'v4/room',
            data : { name : room_name, format : 'json' },
            accepts : 'application/json',
            success : receivedRoom,
            error : errorHandler(either(args, 'failedRoomGet', noop))
        });
    }