function() {
        _.bindAll(this);
        Greenmine.taskCollection.on("reset", this.reset);
        Greenmine.taskCollection.on("remove", this.deleteIssue);

        this.lightbox = new Greenmine.Lightbox({
            el: $("#delete-task-dialog")
        });

        this._milestone_id = this.$el.data('milestone');
        this._order = "created_date";
        this._order_mod = "-";
        this._status = "closed";
    }