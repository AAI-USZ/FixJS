function(){
        _this = this;
        this.routes = {
            'user/*username': 'showPage',
            'stream/*username': 'showStream'
        }

        this.initialize = function(){
           JQuery(window).bind('hashchange', function(){
                Frontend.userModal.hide();
            })
        }

        /**
         * Shows a user page
         * @param  string   username Username to display a page for
         */
        this.showPage = function(username)
        {
            Log('debug', 'Showing user page ' + username);
            JQuery.ajax({
                url: 'assets/templates/userprofile.html',
                cache: false,
                success: function(html) {
                    Api.get_object_by_key('user', username, function(userdata) {
                        Log('info', 'Showing user modal for ' + username);
                        userdata.username = username;
                        var u = new User(userdata);
                        Frontend.userModal.show(html, u);

                    }, true);
                },
                error: function(s, err) {
                    Log('error', "Couldn't get user page template, retrying!");
                    Async.later(5000, function(){
                        _this.showPage(username);
                    });
                }
            });
        }

        this.showStream = function(username)
        {
            Log('debug', 'Showing user stream page ' + username);
            JQuery.ajax({
                url: 'assets/templates/stream.html',
                cache: false,
                success: function(html) {
                    Api.get_object_by_secondary_key('stream', 'user', username, function(userdata) {
                        Log('info', 'Showing user modal for ' + username);
                        userdata.username = username;
                        var u = new User(userdata);
                        u.streams = userdata;
                        console.log(u)
                        Frontend.userModal.show(html, u);

                    }, true);
                },
                error: function(s, err) {
                    Log('error', "Couldn't get user page template, retrying!");
                    Async.later(5000, function(){
                        _this.showStream(username);
                    });
                }
            });
        }
    }