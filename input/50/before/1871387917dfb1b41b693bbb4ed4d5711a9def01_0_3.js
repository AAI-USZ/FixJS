function() {
            FB.init({
                appId      : appId,
                channelUrl : channelUrl,
                status     : true,
                cookie     : true,
                xfbml      : true
            });
            FB.Event.subscribe("auth.statusChange", onStatusChange);
        }