function(json) {
        var key;
        if (json && json.listing && json.listing.listing_id) {
            for (key in json.listing) {
                this[key] = json.listing[key];
            }
        }
        this.loggedin_profile = json && json.loggedin_profile;
        this.loggedin_profile_id = this.loggedin_profile && this.loggedin_profile.profile_id;
        this.listing_url = 'http://starutpbidder.com/company-page.html?id=' + this.listing_id;
        this.listing_public_title = 'Startupbidder Listing: ' + this.title;
        if (this.preview) {
            pl('#header').hide();
            pl('#footer').hide();
        }
     }