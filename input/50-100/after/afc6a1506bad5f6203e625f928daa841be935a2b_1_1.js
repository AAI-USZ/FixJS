function(feed) {
            if(EventSource) feed = JSON.parse(feed.data);
            var subscribers = subscriptions[feed.src] || [];
            subscribers.forEach(function(s) {
                s(feed);
            });
        }