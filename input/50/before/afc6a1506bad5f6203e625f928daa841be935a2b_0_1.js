function(feed) {
            var subscribers = subscriptions['onReceiveFeed'] || [];
            subscribers.forEach(function(s) {
                s(JSON.parse(feed));
            });
        }