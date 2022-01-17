function() {
            var flag;
            var view = this.story_view;
            
            if (this.flags['page_view_showing_feed_view']) {
                view = 'feed';
                flag = 'page';
            } else if (this.flags['feed_view_showing_story_view']) {
                view = 'story';
                flag = 'story';
            }

            this.flags.scrolling_by_selecting_story_title = true;
            clearTimeout(this.locks.scrolling);
            this.locks.scrolling = _.delay(_.bind(function() {
                this.flags.scrolling_by_selecting_story_title = false;
            }, this), 1000);
            this.make_content_pane_feed_counter();
            this.position_mouse_indicator();
            
            this.switch_taskbar_view(view, flag);
            NEWSBLUR.app.story_titles.fill_out();
            this.flags.fetch_story_locations_in_feed_view = this.flags.fetch_story_locations_in_feed_view ||
                                                            _.throttle(function() {
                                                                NEWSBLUR.app.story_list.reset_story_positions();
                                                            }, 2000);
            this.flags.fetch_story_locations_in_feed_view();
        }