function(story, collection, changes) {
        this.friend_comments = new NEWSBLUR.Collections.Comments(this.get('friend_comments'));
        this.public_comments = new NEWSBLUR.Collections.Comments(this.get('public_comments'));
    }