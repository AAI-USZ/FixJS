function (jid) {
        if (jid === 'online-users-container') {
            chatbox = new xmppchat.ControlBox({'id': jid, 'jid': jid});
            view = new xmppchat.ControlBoxView({
                model: chatbox 
            });
        } else {
            chatbox = new xmppchat.ChatBox({'id': jid, 'jid': jid});
            view = new xmppchat.ChatBoxView({
                model: chatbox 
            });
        }
        this.views[jid] = view.render();
        this.options.model.add(chatbox);
    }