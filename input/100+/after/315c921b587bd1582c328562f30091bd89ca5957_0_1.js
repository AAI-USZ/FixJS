function() {
        var logobg = this.logo ? 'url(' + this.logo + ') no-repeat scroll left top' : null,
            url = this.website ? new URLClass(this.website) : null,
            categoryaddresstext = (this.category ? (this.category==='Other' ? 'A' : (this.category.match(/^[AEIOU]/) ? 'An '+this.category : 'A '+this.category)) : 'A')
                + ' company' + (this.brief_address ? ' in ' + this.brief_address : ''),
            founderstext = (this.founders ? ' founded by ' + this.founders : ''),
            status = this.status || 'new',
            website = this.website || '/company-page.html?id=' + this.listing_id,
            listingdatetext = '<span class="inputmsg">' + SafeStringClass.prototype.ucfirst(status) + '</span> listing'
                + (this.listing_date ? ' from ' + DateClass.prototype.format(this.listing_date) : (this.status === 'new' ? ' not yet listed' : ''))
                + (this.website ? ' at ' : '');
        if (logobg) {
            pl('#companylogo').removeClass('noimage').css({background: logobg});
        }
        pl('#title').text(this.title || 'Company Name Here');
        pl('title').text('Startupbidder Listing: ' + (this.title || 'Company Name Here'));
        pl('#mantra').text(this.mantra || 'Mantra here');
        pl('#companystatus').text('Listing is ' + status);
        if (status === 'withdrawn') {
            pl('#companystatus').addClass('attention');
        }
        pl('#categoryaddresstext').text(categoryaddresstext);
        pl('#founderstext').text(founderstext);
        pl('#listing_date_text').html(listingdatetext);
        pl('#websitelink').attr({href: website});
        if (url) {
            pl('#domainname').text(url.getHostname());
        }
        else {
            pl('#domainname').text('visit listing page');
        }
    }