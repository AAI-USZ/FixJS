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
        // panelView.authenticate();


        // authenticate: function() {
        // var _this = this;
        $.ajax({
            url: '/users/me',
            type: 'GET',
            // IMPORTANT Stop using asynchronous here
            // async: false,
            success: function(json) {
                panelView.user = json;
                if (json.is_online) {

                    panelView.status('You have logged in, this page will be identified as anonymous', 1, 'warning');

                    $('#wrapper-titlelogin').height($('#wrapper-titlelogin').height());
                    panelView.$('.loginTitle').fadeOut();
                    panelView.$('.login').fadeOut(function() {
                        $('#wrapper-titlelogin').animate({
                            height: '0px'
                        });
                    });
                    chatView.poll(true);
                } else {
                    panelView.showUserinfo(json);
                    panelView.status(0);
                }

            },
            error: function() {
                panelView.showLogin();

                chatView.poll();
                panelView.status(0);
            },
            complete: function() {
                panelView.updateRoominfo();
            }
        });
        // },

    }