function() {
            var _this = this;
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