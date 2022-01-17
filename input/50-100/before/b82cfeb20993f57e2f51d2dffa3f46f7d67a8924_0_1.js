function() {
        var current = {
            "order_by": this._order_mod + this._order,
            "milestone": this._milestone_id,
        }
        if (this._status.length > 0) {
            current['status'] = this._status;
        }
        return current;
    }