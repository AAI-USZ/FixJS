function () {
            that.removeChatFromCookie(that.model.get('id'));
            // Only reorder chats if it wasn't the last chat being closed.
            var offset = parseInt($(that.el).css('right'), 10) + xmppchat.chatboxesview.chatbox_width;
            if ($("div[style*='right: "+offset+"px']").length > 0) {
                xmppchat.chatboxesview.reorderChats();
            }
        }