function(event){
        event.preventDefault();
        event.stopPropagation();
        var self = $(event.target);
        var status_filter = self.attr('category');
        this.options.status_filter.pop(status_filter);
        this.reload();
    }