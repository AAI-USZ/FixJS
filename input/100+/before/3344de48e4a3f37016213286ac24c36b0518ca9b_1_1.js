function () {
        /* Check the open-chats cookie and re-open all the chatboxes it mentions.
         * We need to wait for current chatbox creation to finish before we create the
         * next, so we use a task buffer to make sure the next task is only
         * executed after the previous is done.
        */
        var cookie = jQuery.cookie('chats-open-'+xmppchat.username),
            open_chats = [];

        jQuery.cookie('chats-open-'+xmppchat.username, null, {path: '/'});
        if (cookie) {
            open_chats = cookie.split('|');
            // FIXME: Change this so that the online contacts box is always created first.
            for (var i=0; i<open_chats.length; i++) {
                xmppchat.Taskbuffer.tasks.push({'that': this, 'method':this.getChatbox, 'parameters':[open_chats[i]]});
            }
            xmppchat.Taskbuffer.handleTasks();
        }
    }