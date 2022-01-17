function() {
        // views
        panelView = new PanelView({el: $('#panel')}),
        chatView = new ChatView({el: $('#main')});
        // debug
        window.panelView = panelView;
        window.chatView = chatView;
        window.Utils = Utils;

        // load recents
        chatView.getRecents();

        // authenticate user
        /*
         * API requesting should following a sequence
         *  1. /users/me
         *  2. /chat/messages/update    /room
         */
        $.ajax({
            url: '/users/me',
            type: 'GET',
            success: function(json) {
                panelView.user = json;
                if (json.is_online) {
                    chatView.poll(true);

                    panelView.status('Duplicate login', 1, 'warning');

                    var loginTitle = panelView.$('.title.loginTitle'),
                        login = panelView.$('.login'),
                        wrapper,
                        time = 500;
                    loginTitle.wrap('<div></div>');
                    wrapper = loginTitle.parent();
                    login.appendTo(wrapper);
                    wrapper.height(wrapper.height());

                    loginTitle.fadeOut(time);
                    login.fadeOut(time);
                    setTimeout(function() {
                        wrapper.animate({
                            height: '0px'
                        }, time + 100, function() {
                            loginTitle.unwrap();
                        });
                    }, time);
                } else {
                    chatView.poll();

                    panelView.showUserinfo(json);
                    panelView.status(0);
                }
                console.log('end success()');
            },
            error: function() {
                panelView.showLogin();

                chatView.poll();
                panelView.status(0);
            },
            complete: function() {
                console.log('start complete()');
                panelView.updateRoominfo();
            }
        });

    }