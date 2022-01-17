function(json) {
        if (json) {
            this.store(json);
        }
        this.displayComments();
        if (this.loggedin_profile_id) {
            this.displayAddCommentBox();
        }
        else {
            pl('#addcommentbox').before('<div class="messageline"><p style="font-weight: bold;">Login to post a comment</p></div>');
        }
        pl('#commentswrapper').show();
    }