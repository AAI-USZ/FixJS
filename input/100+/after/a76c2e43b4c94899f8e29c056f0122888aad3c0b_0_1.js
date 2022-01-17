function(completeFunc) {
        var titleroot = (this.type === 'category' || this.type === 'location') ? this.val.toUpperCase() : this.type.toUpperCase(),
            title = this.type === 'keyword' ? 'SEARCH RESULTS' : ((this.type === 'location') ? 'LISTINGS IN ' + titleroot : titleroot + ' LISTINGS'),
            ajax;
        this.setListingSearch();
        ajax = new AjaxClass(this.url, 'companydiv', completeFunc);
        pl('#listingstitle').html(title);
        if (this.type === 'top') {
            pl('#banner').addClass('topbanner');
            pl('#welcometitle').html('Only the best');
            pl('#welcometext').html('The highest ranking listings on startupbidder');
        }
        else if (this.type === 'valuation') {
            pl('#banner').addClass('valuationbanner');
            pl('#welcometitle').html('Invest in a startup today');
            pl('#welcometext').html('The listings below are ready for investment and open for bidding');
        }
        else if (this.type === 'keyword') {
            pl('#banner').addClass('keywordbanner');
            pl('#welcometitle').html('Search for a startup');
            pl('#welcometext').html('Matching listings');
        }
        else if (this.type === 'latest') {
            pl('#banner').addClass('latestbanner');
            pl('#welcometitle').html("What's fresh?");
            pl('#welcometext').html('The most recent listings on startupbidder');
        }
        else if (this.type === 'category') {
            pl('#banner').addClass('categorybanner');
            pl('#welcometitle').html('Industry');
            pl('#welcometext').html('Latest listings in the ' + this.val + ' industry');
        }
        else if (this.type === 'location') {
            pl('#banner').addClass('locationbanner');
            pl('#welcometitle').html('Location');
            pl('#welcometext').html('Latest listings from ' + this.val);
        }
        ajax.ajaxOpts.data = this.data;
        ajax.call();
    }