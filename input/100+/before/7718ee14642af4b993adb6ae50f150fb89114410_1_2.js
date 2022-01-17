function (chat, jid) {
        // Some operations that need to be applied on a chatbox
        // after it has been created.
        var chat_content,
            value;
        if (jid === 'online-users-container') {
            // Make sure the xmpp status is correctly set on the control box
            value = xmppchat.Storage.get(xmppchat.username+'-xmpp-status') || 'online';
            $(chat).find('#select-xmpp-status').val(value);
        } else {
            chat_content = $(chat).find('.chat-content');
            $(chat).find(".chat-textarea").focus();
            if (chat_content.length > 0) {
                chat_content.scrollTop(chat_content[0].scrollHeight);
            }
        }

        if (!(jid in helpers.oc(this.chats))) {
            this.chats.push(jid);
        }
        this.addChatToCookie(jid);
    }