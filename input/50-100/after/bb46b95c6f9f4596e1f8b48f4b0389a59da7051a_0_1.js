function() {
            var _this = this;
            $.ajax({
                url: '/auth/logout',
                type: 'GET',
                success: function() {
                    _this.status('You have logged out', 0, 'warning');

                    chatView.repoll();
                    _this.showLogin();
                    _this.updateRoominfo();
                }
            });
        }