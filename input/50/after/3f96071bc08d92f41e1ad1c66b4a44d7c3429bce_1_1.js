function(json) {
        this.loggedin_profile_id = json.loggedin_profile && json.loggedin_profile.profile_id;
        this.listing = json.listing || {};
        this.commentlist = json.comments || [];
    }