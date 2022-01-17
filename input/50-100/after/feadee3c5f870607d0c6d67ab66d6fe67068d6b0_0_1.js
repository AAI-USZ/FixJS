function(story_id, story_feed_id, comment_user_id, reply_comments, original_message, callback, error_callback) {
        this.make_request('/social/save_comment_reply', {
            story_id: story_id,
            story_feed_id: story_feed_id,
            comment_user_id: comment_user_id,
            reply_comments: reply_comments,
            original_message: original_message,
            format: 'html'
        }, callback, error_callback, {
            request_type: 'POST'
        });
    }