function(json) {
        var validactions = json && json.valid_actions || [],
            bidsprops = json && json.bids_props || {},
            jsonlist = json && json.bids || [],
            bid,
            i;
        this.bidsprops = bidsprops;
        this.validactions = validactions;
        this.bids = [];
        if (jsonlist.length) {
            jsonlist.reverse(); // we want orderdd by date
            for (i = 0; i < jsonlist.length; i++) {
                bid = new BidClass(this);
                bid.store(jsonlist[i]);
                this.bids.push(bid);
            }
        }
        else {
            bid = new BidClass(this);
            bid.setEmpty();
            this.bids.push(bid);
        }
        this.more_results_url = this.bids.length > 0 && json.bids_props && json.bids_props.more_results_url;
    }