function(json) {
        var banner = new CompanyBannerClass();
        if (json.notification) {
            this.store(json.notification);
        }
        else if (json) {
            this.store(json);
        }
        else {
            this.setEmpty();
        }
        pl('#notificationmessage').text(this.message);
        if (this.link) {
            pl('#notificationlink').attr({href: this.link})
            pl('#notificationview').show();
        }
        if (!json.listing && json.listing_id) { // construct virtual listing
            json.listing = {
                listing_id: json.listing_id,
                title: json.listing_name,
                owner: json.listing_owner,
                category: json.listing_category,
                brief_address: json.listing_brief_address,
                mantra: json.listing_mantra,
                logo: json.listing_logo_url,
                status: 'active'
            };
        }
        if (json.listing) {
            banner.displayMinimal(json);
            pl('#notificationlistingwrapper .companyheader').addClass('notificationlistingheader');
            pl('#notificationlistingwrapper .companybanner').addClass('notificationlistingbanner');
            pl('#notificationlistingwrapper').show();
        }
    }