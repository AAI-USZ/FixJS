function(json) {
        if (json) {
            this.store(json);
        }
        this.displayComments();
        if (this.loggedin_profile_id && this.listing.status === 'active') {
            this.displayAddCommentBox();
        }
        else if (this.listing.status !== 'active') {
            pl('#addcommentbox').before('<div class="messageline"><p style="font-weight: bold;">Comments can only be made on active listings</p></div>');
        }
        else {
            pl('#addcommentbox').before('<div class="messageline"><p style="font-weight: bold;">Login to post a comment</p></div>');
        }
        pl('#commentswrapper').show();
    }