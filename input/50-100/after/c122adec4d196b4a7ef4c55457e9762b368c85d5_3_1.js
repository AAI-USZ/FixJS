function(data) {
                if (data.new_feed_id) {
                    NEWSBLUR.reader.force_feed_refresh(feed_id, data.new_feed_id);
                    $.modal.close();
                } else {
                    $error.show().html((data && data.message) || "There was a problem fetching the feed from this URL.");
                    $loading.removeClass('NB-active');
                    $submit.removeClass('NB-disabled').attr('value', 'Parse this RSS/XML Feed');
                }
            }