function(json) {
        var html = '',
            i,
            bid;
        if (json !== undefined) {
            this.store(json);
        }
        if (this.bids.length) {
            html = BidClass.prototype.makeHeader();
            if (this.more_results_url) {
            	html += '<div class="showmore hoverlink" id="moreresults"><span class="initialhidden" id="moreresultsurl">' + self.more_results_url + '</span><span id="moreresultsmsg">Earlier bids...</span></div>\n';
            }
            for (i = 0; i < this.bids.length; i++) {
                bid = this.bids[i];
                html += bid.makeHtml({ last: (i === this.bids.length - 1)});
            }
        }
        else {
            bid = new BidClass(this);
            bid.setEmpty();
            html += bid.makeHtml({ last: true });
        }
        pl('#bidlistlast').before(html);
        this.bindBidBox();
        if (this.more_results_url) {
            this.bindMoreResults();
        }
        pl('#bidsloggedin').show();
    }