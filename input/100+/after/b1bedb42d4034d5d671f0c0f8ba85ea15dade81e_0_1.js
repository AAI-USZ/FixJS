function(amount, direction) {
            var page_height = this.$s.$story_pane.height();
            var scroll_height = parseInt(page_height * amount, 10);
            var dir = '+';
            if (direction == -1) {
                dir = '-';
            }
            // NEWSBLUR.log(['page_in_story', this.$s.$story_pane, direction, page_height, scroll_height]);
            if (this.story_view == 'page' && !this.flags['page_view_showing_feed_view']) {
                this.$s.$feed_iframe.scrollTo({
                    top: dir+'='+scroll_height, 
                    left:'+=0'
                }, 230, {queue: false});
            } else if (this.story_view == 'feed' || this.flags['page_view_showing_feed_view']) {
                this.$s.$feed_stories.scrollTo({
                    top: dir+'='+scroll_height, 
                    left:'+=0'
                }, 230, {queue: false});
            }
            
            this.show_mouse_indicator();
            // _.delay(_.bind(this.hide_mouse_indicator, this), 350);
        }