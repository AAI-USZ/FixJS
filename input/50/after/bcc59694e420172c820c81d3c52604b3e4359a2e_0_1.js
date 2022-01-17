function(cookie) {
            var curr_uid = cookie.value;
            // attempt to register user - TODO handle user not logged in case
            $.post( 'http://redpill.herokuapp.com/register?userid=' + curr_uid , function( response ) {
                self.updateUnreadNotifCount();
            });
        }