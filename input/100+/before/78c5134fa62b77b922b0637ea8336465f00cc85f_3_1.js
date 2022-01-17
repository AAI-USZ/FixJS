function() {
        var story_id = this.$el.data("storyId");
        var feed_id = this.$el.data("feedId");
        var user_comments = this.$el.data("userComments");
        var shared = this.$el.hasClass('NB-story-shared');
        var $sideoptions = this.$('.NB-feed-story-sideoptions-container');
        
        this.comments_view = new NEWSBLUR.Views.SocialPageComments({
            el: this.$('.NB-story-comments-container'),
            story_id: story_id,
            feed_id: feed_id
        });
        
        var story = new Backbone.Model({
            story_feed_id: feed_id,
            id: story_id,
            shared_comments: user_comments,
            shared: shared
        });
        story.social_page_comments = this.comments_view;
        story.social_page_story = this;
        
        if (NEWSBLUR.Globals.is_authenticated) {
            _.delay(_.bind(function() {
                this.share_view = new NEWSBLUR.Views.StoryShareView({
                    el: this.el,
                    model: story,
                    on_social_page: true
                });
                $sideoptions.append($(this.share_view.template({
                    story: story,
                    social_services: NEWSBLUR.assets.social_services
                })));
            }, this), 50);
        } else {
            _.delay(_.bind(function() {
                this.login_view = new NEWSBLUR.Views.SocialPageLoginView({
                    el: this.el,
                    model: story
                });
                $sideoptions.append($(this.login_view.template({
                    story: story
                })));

            }, this), 50);
        }
        
        this.$('.NB-user-avatar').tipsy({
            delayIn: 50,
            gravity: 's',
            fade: true,
            offset: 3
        });
    }