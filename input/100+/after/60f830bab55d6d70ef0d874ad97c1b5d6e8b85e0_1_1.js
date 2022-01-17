function() {
        var limit = 100, grid = this.grid, collection = this.collection;
        grid.appendTo($('#qunit-fixture'));
        collection.load({limit: limit}).done(function(data) {
            grid.set('models', data);
            verifyGridMatchesData(data, grid, limit);

            // give the rows a chance to attach handlers
            setTimeout(function() {
                grid.set('models', null);
                verifyGridMatchesData([], grid, 0);
                setTimeout(start, 15);
            }, 15);
        });
    }