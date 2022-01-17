function() {

        var current = {
            "order_by": this._order_mod + this._order,
            "milestone": this._milestone_id,
            "tags": this.options.tag_filter
        }
        if (this._status.length > 0) {
            current['status'] = this._status;
        }
        return current;
    }