function() {
            if (cache.attendees.indexOf(cache.userID) > -1) return;
            
            FB.api("/" + eventId + "/attending", "post", function(payload) {
                var index = cache.attendees.indexOf(cache.userID)
                  , error = payload.error;
                if (error.code == 104) {
                    FB.login(onLogin, {scope: permissions});
                } else if (error.code == 100) {
                    if (index > -1) {
                        cache.attendees.splice(index, 1);
                        drawPictures();
                    }
                }
            });
            
            if (cache.userID != null) {
                cache.attendees.push(cache.userID);
                drawPictures();
            }
        }