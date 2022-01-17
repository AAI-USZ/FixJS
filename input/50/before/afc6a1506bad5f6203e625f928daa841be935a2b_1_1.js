function(feed) {
            if(EventSource) feed = JSON.parse(feed.data);
            _streamFeeds(feed);
        }