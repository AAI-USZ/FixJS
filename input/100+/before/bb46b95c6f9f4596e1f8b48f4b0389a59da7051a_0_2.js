function() {
        // views
        panelView = new PanelView({el: $('#panel')}),
        chatView = new ChatView({el: $('#main')});
        // debug
        window.panelView = panelView;
        window.chatView = chatView;

        // authenticate user
        /*
         * API requesting should following a sequence
         *  1. /users/me
         *  2. /chat/messages/update    /room
         */
        panelView.authenticate();

        // connect to server
        chatView.poll();

    }