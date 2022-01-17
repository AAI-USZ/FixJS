function(json) {
        this.loggedin_profile_id = json.loggedin_profile && json.loggedin_profile.profile_id;
        this.commentlist = json.comments || [];
    }