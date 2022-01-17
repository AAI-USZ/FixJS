function(json) {
        var companiesval = json && json[this.options.propertykey],
            postnowlink = json && json.loggedin_profile ? 'new-listing-basics-page.html' : json.login_url,
            isadmin = json && json.loggedin_profile && json.loggedin_profile.admin,
            tileoptions = { admin: isadmin },
            more_results_url = json.listings_props && json.listings_props.more_results_url,
            html = "",
            seeall,
            companies,
            company,
            tile,
            last,
            i;
        if (this.options.propertyissingle) {
            companies = companiesval ? [ companiesval ] : [];
        }
        else {
            companies = companiesval || [];
        }
        seeall = this.options.seeall && companies && (companies.length >= this.options.colsPerRow),
        pl('#postnowtextlink,#postnowbtnlink').attr({href: postnowlink});
        if (!companies.length) {
            pl('#'+this.options.companydiv).html('<span class="attention">No companies found</span>');
            return;
        }
        for (i = 0; i < companies.length; i++) {
            company = companies[i];
            tile  = new CompanyTileClass(tileoptions);
            tile.store(company);
            if (this.options.fullWidth || (this.options.colsPerRow === 4 && companies.length === 1)) {
                html += tile.makeFullWidthHtml();
            }
            else if (this.options.colsPerRow === 4 && companies.length === 2 && i === 0) {
                html += tile.makeHalfWidthHtml();
            }
            else if (this.options.colsPerRow === 4 && companies.length === 2 && i === 1) {
                html += tile.makeHalfWidthHtml('last');
            }
            else if (this.options.colsPerRow === 4 && companies.length === 3 && i < 2) {
                html += tile.makeHtml();
            }
            else if (this.options.colsPerRow === 4 && companies.length === 3 && i === 2) {
                html += tile.makeHalfWidthHtml('last');
            }
            else {
                last = (i+1) % this.options.colsPerRow === 0 ? 'last' : '';
                html += tile.makeHtml(last);
            }
        }
        if (more_results_url) {
            html += '<div class="showmore hoverlink" id="moreresults"><span class="initialhidden" id="moreresultsurl">' + more_results_url + '</span><span id="moreresultsmsg">More...</span></div>\n';
        }
        else if (seeall) {
            html += '<div class="showmore"><a href="' + this.options.seeall + '">See all...</a></div>\n';
        }
        pl('#'+this.options.companydiv).html(html);
        if (more_results_url) {
            this.bindMoreResults();
        }
    }