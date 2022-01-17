function() {
            var $comment = $(this);
            var comment_view = new NEWSBLUR.Views.StoryComment({
                el: $comment,
                on_social_page: true,
                story: self.model
            });
            self.comment_views.push(comment_view);
        }