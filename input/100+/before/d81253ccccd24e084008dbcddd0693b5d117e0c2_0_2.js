function(event){
        var playlist_type = form.find('input:radio[name=sp_type]:checked').val(),
            data = $('form').serializeArray(),
            static_action = 'Playlist/smart-playlist-generate',
            dynamic_action ='Playlist/smart-playlist-criteria-save',
            action,
            callback;
		
        if (playlist_type == "0") {
            action = static_action;
            callback = staticCallback;
        } else {
            action = dynamic_action;
            callback = dynamicCallback;
        }
        $.post(action, {format: "json", data: data}, callback);
    }