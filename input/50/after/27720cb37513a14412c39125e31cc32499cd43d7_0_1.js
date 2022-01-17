function(event) {
        event.preventDefault();
        var target = $(event.currentTarget);
        this._status = target.data('type');
        this.reload();
    }