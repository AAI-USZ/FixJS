function(e) {
                e.preventDefault();
                if (self.flags.social_view) {
                    self.mark_feed_as_read();
                } else if (self.flags.river_view) {
                    self.mark_folder_as_read();
                } else {
                    self.mark_feed_as_read();
                }
            }