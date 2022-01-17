function() {
            this.hide_mouse_indicator();
            
            if (this.story_view == 'story' ||
                this.flags['feed_view_showing_story_view']) {
                // this.hide_mouse_indicator();
            } else {
                _.delay(_.bind(this.show_mouse_indicator, this), 350);
            }
        }