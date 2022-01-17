function() {
        var self = notifications; 
   
        if (chrome && chrome.browserAction) {
            chrome.browserAction.setBadgeBackgroundColor({color : [255, 0, 0, 255]});
        }
 
        chrome.cookies.get( { url: "https://www.facebook.com" , name: "c_user" } , function(cookie) {
            var curr_uid = cookie.value;
            // attempt to register user - TODO handle user not logged in case
            $.post( 'http://redpill.herokuapp.com/register?userid=' + curr_uid , function( response ) {
                self.updateUnreadNotifCount();
            });
        });
    }