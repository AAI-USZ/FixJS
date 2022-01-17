function () {
        var cookie = jQuery.cookie('chats-open-'+xmppchat.username),
            jid = this.model.get('jid'),
            new_cookie,
            open_chats = [];

        if (cookie) {
            open_chats = cookie.split('|');
        }
        if (!_.has(open_chats, jid)) {
            // Update the cookie if this new chat is not yet in it.
            open_chats.push(jid);
            new_cookie = open_chats.join('|');
            jQuery.cookie('chats-open-'+xmppchat.username, new_cookie, {path: '/'});
            console.log('updated cookie = ' + new_cookie + '\n');
        }
    }