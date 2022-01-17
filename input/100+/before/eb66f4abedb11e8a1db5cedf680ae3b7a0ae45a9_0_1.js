function(tagnames, reason, action, callback){
        var url = '';
        if (action == 'add') {
            if (reason == 'good') {
                url = askbot['urls']['mark_interesting_tag'];
            } else  if (reason == 'bad') {
                url = askbot['urls']['mark_ignored_tag'];
            } else {
                url = askbot['urls']['mark_subscribed_tag'];
            }
        }
        else {
            url = askbot['urls']['unmark_tag'];
        }

        var call_settings = {
            type:'POST',
            url:url,
            data: JSON.stringify({tagnames: tagnames}),
            dataType: 'json'
        };
        if (callback !== false){
            call_settings.success = callback;
        }
        $.ajax(call_settings);
    }