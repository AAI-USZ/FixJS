function (e) {
        e.preventDefault();
        var jid = this.model.get('jid');
        if (!xmppchat.chatboxes.get(jid)) {
            chatbox = new xmppchat.ChatBox({'id': jid, 'jid': jid});
            xmppchat.chatboxes.add(chatbox);
        } else {
            var view = xmppchat.chatboxesview.views[jid];
            if (view) {
                if (view.isVisible()) {
                    view.focus();
                } else {
                    view.show();
                    xmppchat.chatboxesview.reorderChatBoxes();
                }
            }
        }
    }