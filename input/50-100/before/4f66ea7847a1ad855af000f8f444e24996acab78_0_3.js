function refreshParticipants() {
        received_participants = false;
        $.ajax({
            url : 'v4/participant',
            data : { room : room.id, limit : 0, format : 'json' },
            accepts : 'application/json',
            success : receivedParticipants,
            error : errorHandler(either(args, 'refreshParticipantsError', noop))
        });
    }