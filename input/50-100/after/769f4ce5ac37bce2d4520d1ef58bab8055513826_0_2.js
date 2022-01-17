function(x) {
        if (!arguments.length) return tilejson;
        // prefer templates over formatters
        if (x.template) {
            manager.template(x.template);
        } else if (x.formatter) {
            manager.formatter(x.formatter);
        } else {
            // In this case, we cannot support grids
            formatter = undefined;
        }
        manager.gridUrl(x.grids);
        if (x.resolution) resolution = x.resolution;
        tilejson = x;
        return manager;
    }