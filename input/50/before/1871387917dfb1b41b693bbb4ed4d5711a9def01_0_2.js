function(payload) {
            if (payload.authResponse != null )
                cache.userID = payload.authResponse.userID;
            getAttendees(function() {
                drawPictures();
            });
        }