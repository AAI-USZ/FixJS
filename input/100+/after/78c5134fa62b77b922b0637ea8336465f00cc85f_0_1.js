function(modelA, modelB) {
        var sort_order = NEWSBLUR.assets.preference('feed_order');
        
        if (modelA.is_feed() != modelB.is_feed()) {
            // Feeds above folders
            return modelA.is_feed() ? -1 : 1;
        }
        if (modelA.is_folder() && modelB.is_folder()) {
            // Folders are alphabetical
            return modelA.get('folder_title').toLowerCase() > modelB.get('folder_title').toLowerCase() ? 1 : -1;
        }
        
        var feedA = modelA.feed;
        var feedB = modelB.feed;
        
        if (!feedA || !feedB) {
            return !feedA ? 1 : -1;
        }
        
        if (sort_order == 'ALPHABETICAL' || !sort_order) {
            return feedA.get('feed_title').toLowerCase() > feedB.get('feed_title').toLowerCase() ? 1 : -1;
        } else if (sort_order == 'MOSTUSED') {
            return feedA.get('feed_opens') < feedB.get('feed_opens') ? 1 : 
                (feedA.get('feed_opens') > feedB.get('feed_opens') ? -1 : 
                (feedA.get('feed_title').toLowerCase() > feedB.get('feed_title').toLowerCase() ? 1 : -1));
        }
    }