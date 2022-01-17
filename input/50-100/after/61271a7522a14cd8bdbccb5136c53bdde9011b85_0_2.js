function(event){
        event.preventDefault();
        var target = $(event.currentTarget);
        var status_filter = target.attr('category');


        if ($.inArray(status_filter, this.options.status_filter)<0){
            this.options.status_filter.push(status_filter);
            this.reload();
        }
    }