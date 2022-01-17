function sendChat(chat_text, success, fail) {
        var has_at = /@[A-z_0-9]+/;
        var has_whisper = /^\/msg [A-z_0-9]+/;
        var at = [];
        var priv = false;

        if(has_at.test(chat_text)) {
            at = [has_at.exec(chat_text).substring(1)];
        }

        if(has_whisper.test(chat_text)) {
            priv = true;
            at = [has_whisper.exec(chat_text).substring(4)];
        }

        var data = {
            text: chat_text,
            at: at,
            "private" : priv,
            user : my_user,
            room : room.resource_uri,
            where : { coordinates: [location[0], location[1]], type:'Point' }
        };

        $.ajax({
            url : 'v4/chat/',
            success : success,
            contentType: 'application/json',
            error : fail,
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            processData: false
        });
    }