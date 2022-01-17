function() {
        _.bindAll(this);

        Greenmine.taskCollection.on("reset", this.reset);
        Greenmine.taskCollection.on("remove", this.deleteIssue);

        this.lightbox = new Greenmine.Lightbox({el: $("#issues-delete-dialog")});
        this.lightbox.on('delete', this.deleteIssue);

        this._milestone_id = this.$el.data('milestone');
        this._order = "created_date";
        this._order_mod = "-";
        this._status = "";

        var order_by = getUrlVars()["order_by"];
        if (order_by === undefined){
            this.options.order_by = "-priority";
        } else {
            this.options.order_by = order_by;
        }

        this.options.tag_filter = getIntListFromURLParam('tags');
        this.options.milestone_filter = getIntListFromURLParam('milestone');

        var base_status_filter = getUrlVars()['status'];

        this.options.status_filter = getStringListFromURLParam('status');
        this.options.assigned_to_filter = getIntListFromURLParam('assigned_to');
        this.options.severity_filter = getIntListFromURLParam('severity');
        this.filters_box_visible = false;
    }