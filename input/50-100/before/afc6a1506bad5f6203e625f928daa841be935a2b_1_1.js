function(feed) {
            var subscribers = subscriptions[feed.src] || [];
            subscribers.forEach(function(s) {
                s(feed);
            });
        }