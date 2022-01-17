function() {

        var current = {
            "order_by": this._order_mod + this._order,
            "milestone": this.options.milestone_filter,
            "tags": this.options.tag_filter,
            "status": this.options.status_filter,
            "assigned_to": this.options.assigned_to_filter
        }
        return current;
    }