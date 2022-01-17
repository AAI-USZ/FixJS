function($t, $p){
                e.preventDefault();
                var $interaction = $t.closest('.NB-interaction');
                var feed_id = $interaction.data('feedId');
                var story_id = $interaction.data('contentId');
                var user_id = $interaction.data('userId');
                var username = $interaction.data('username');
                
                self.close_social_profile();
                if (self.model.get_feed(feed_id)) {
                    self.open_social_stories(feed_id, {'story_id': story_id});
                } else {
                    var socialsub = self.model.add_social_feed({
                        id: feed_id, 
                        user_id: user_id, 
                        username: username
                    });
                    self.load_social_feed_in_tryfeed_view(socialsub, {'story_id': story_id});
                }
            }