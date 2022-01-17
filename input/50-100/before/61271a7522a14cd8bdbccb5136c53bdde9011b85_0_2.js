function(event){
        event.preventDefault();
        var self = $(event.target);
        var status_filter = self.attr('category');
        if ($.inArray(status_filter, this.options.status_filter)<0){
            this.options.status_filter.push(status_filter);
            this.reload();
        }
    }