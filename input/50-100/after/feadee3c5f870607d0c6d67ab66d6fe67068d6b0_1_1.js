function() {
            var $comment = $(this);
            var comment = new Backbone.Model({
                user_id: $comment.data('userId')
            });
            var comment_view = new NEWSBLUR.Views.StoryComment({
                el: $comment,
                on_social_page: true,
                story: self.model,
                story_comments_view: self,
                model: comment
            });
            self.comment_views.push(comment_view);
        }