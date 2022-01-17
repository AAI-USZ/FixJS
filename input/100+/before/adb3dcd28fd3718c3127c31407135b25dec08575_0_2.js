function(feed_id) {
            var $content_pane = this.$s.$content_pane;
            feed_id = feed_id || this.active_feed;
            if (!feed_id) return;
            var feed = this.model.get_feed(feed_id);
            
            if (NEWSBLUR.app.story_unread_counter) {
                NEWSBLUR.app.story_unread_counter.remove();
            }
            NEWSBLUR.app.story_unread_counter = new NEWSBLUR.Views.FeedCount({model: feed}).render();

            NEWSBLUR.app.story_unread_counter.$el.css({'opacity': 0});
            this.$s.$story_taskbar.append(NEWSBLUR.app.story_unread_counter.$el);
            _.delay(function() {
                NEWSBLUR.app.story_unread_counter.center();
                NEWSBLUR.app.story_unread_counter.$el.animate({'opacity': .2}, {'duration': 1000, 'queue': false});
            }, 500);
            
        }