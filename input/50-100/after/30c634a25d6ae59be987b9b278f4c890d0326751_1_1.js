function() {
        _.bindAll(this);
        
        updateBreadcrumb("calculator");

        this.template = _.template($('#simulation-template').html());
        this.result_row_template = _.template($('#result-row-template').html());
        this.itemcompare_result_row_template = _.template($('#itemcompare-result-row-template').html());
        
        this.options.settings.on('change display_as', this.modelToView);
    }