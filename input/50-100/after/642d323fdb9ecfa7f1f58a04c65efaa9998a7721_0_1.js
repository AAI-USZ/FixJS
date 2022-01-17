function(site_id, slug) {
        // console.log(["site", site_id, slug]);
        site_id = parseInt(site_id, 10);
        var feed = NEWSBLUR.reader.model.get_feed(site_id);
        if (feed) {
            NEWSBLUR.reader.open_feed(site_id, {force: true});
        } else {
            NEWSBLUR.reader.load_feed_in_tryfeed_view(site_id, {force: true, feed: {
                feed_title: _.string.humanize(slug || "")
            }});
        }
    }