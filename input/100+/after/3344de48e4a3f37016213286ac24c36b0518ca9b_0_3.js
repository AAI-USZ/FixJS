function (e) {
        e.preventDefault();
        var jid = this.model.get('jid');
        xmppchat.chatboxesview.openChat(jid);
    }