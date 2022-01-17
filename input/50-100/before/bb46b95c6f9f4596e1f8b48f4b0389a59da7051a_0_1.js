function() {
            var _this = this;
            $.ajax({
                url: '/users/me',
                type: 'GET',
                // IMPORTANT Stop using asynchronous here
                async: false,
                success: function(json) {
                    _this.user = json;
                    _this.showUserinfo(json);
                },
                error: function() {
                    _this.showLogin();
                },
                complete: function() {
                    _this.updateRoominfo();
                    _this.status(0);
                }
            });
        }