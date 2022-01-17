function(payload) {
                var index = cache.attendees.indexOf(cache.userID);
                if (payload.error && index > -1) {
                    cache.attendees.splice(index, 1);
                    drawPictures();
                }
            }