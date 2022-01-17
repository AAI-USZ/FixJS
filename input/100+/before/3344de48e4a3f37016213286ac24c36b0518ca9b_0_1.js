function () {
        var that = this;
        $('#'+this.model.get('chat_id')).hide('fast', function () {
            // TODO: that.removeChatFromCookie(jid);
            xmppchat.chatboxesview.reorderChatBoxes();
        });
    }