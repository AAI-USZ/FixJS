function(event) {
        event.preventDefault();
        var target = $(event.currentTarget).closest('.milestone-item');
        this._milestone_id = target.data('id');
        this.reload();
    }