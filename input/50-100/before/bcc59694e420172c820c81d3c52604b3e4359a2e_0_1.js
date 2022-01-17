function() {
        var self = notifications; 
    
        chrome.cookies.get( { url: "https://www.facebook.com" , name: "c_user" } , function(cookie) {
            var curr_uid = cookie.value;

            // try to register user TODO

            $.post( 'http://redpill.herokuapp.com/register?userid=' + curr_uid , function( response ) {
                
                // TODO                

                if (chrome && chrome.browserAction) {
                    chrome.browserAction.setBadgeBackgroundColor({color : [255, 0, 0, 255]});
                    self.updateUnreadNotifCount();
                }
            });
        });
    }