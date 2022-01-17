function() {
            FB.init({
                appId      : appId,
                channelUrl : channelUrl,
                status     : false,
                cookie     : true,
                xfbml      : true
            });
            FB.getLoginStatus(onStatusChange);
            cache.attendees = [];
        }