function(online_users) {
            var _this = this;
            if (online_users) {
                _this.$('.roominfo .number').html(online_users);
            } else {
                $.ajax({
                    url: '/room',
                    type: 'GET',
                    success: function(json) {
                        console.log('ajax success this', this);
                        _this.$('.roominfo .number').html(json.online_users.length);
                        // _this.$('.roominfo .users')
                    }
                });
            }

        }