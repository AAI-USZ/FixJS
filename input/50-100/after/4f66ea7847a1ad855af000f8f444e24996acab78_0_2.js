function refreshChats() {
        received_chats = false;
        var when = last_chat_update;
        $.ajax({
            url : 'v4/chat',
            data : { room : room.id, limit : 0, id__gt : when, format : 'json' },
            accepts : 'application/json',
            success : receivedChats,
            error : errorHandler(either(args, 'refreshChatError', noop)),
            beforeSend : function(xhr) { xhr.setRequestHeader('Authorization', hash)}
        });
    }