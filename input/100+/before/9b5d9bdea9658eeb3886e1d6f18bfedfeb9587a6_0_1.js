function(story, collection, changes) {
        var friend_comments = this.get('friend_comments');
        var public_comments = this.get('public_comments');

        if (!this.get('comment_count')) {
            delete this.friend_comments;
            delete this.public_comments;
        } else {
            if (friend_comments && friend_comments.length) {
                this.friend_comments = new NEWSBLUR.Collections.Comments(friend_comments);
            }
            if (public_comments && public_comments.length) {
                this.public_comments = new NEWSBLUR.Collections.Comments(public_comments);
            }
        }
    }