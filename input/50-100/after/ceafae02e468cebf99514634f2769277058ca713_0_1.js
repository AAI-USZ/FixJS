function(payload) {
                var index = cache.attendees.indexOf(cache.userID)
                  , error = payload.error;

                if (error == null) return;

                if (index > -1) {
                    cache.attendees.splice(index, 1);
                    drawPictures();
                }

                if (error.code == 104) {
                    FB.login(onLogin, {scope: permissions});
                }
            }