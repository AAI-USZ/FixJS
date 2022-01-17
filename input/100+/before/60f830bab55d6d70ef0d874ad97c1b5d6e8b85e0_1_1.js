function() {
        var limit = 100, grid = this.grid, collection = this.collection;
        grid.appendTo($('#qunit-fixture'));
        // grid.appendTo($('body'));
        $.when(
            collection.load({limit: limit, offset: 0}),
            collection.load({limit: limit, offset: limit}),
            collection.load({limit: limit, offset: limit*2})
        ).done(function(data1, data2, data3) {
            var $rows, models;

            grid.set('models', data1[0]);
            verifyGridMatchesData(data1[0], grid, limit);

            $rows = grid.$node.find('tbody tr');

            grid.set('models', data2[0]);
            verifyGridMatchesData(data2[0], grid, limit);

            grid.$node.find('tbody tr').each(function(i, tr) {
                equal(tr, $rows[i], 'table row was unnecessarily re-renderd');
                $('td', tr).each(function(j, td) {
                    equal(td, $rows.eq(i).find('td')[j],
                        'table column was unnecessarily re-rendered');
                });
            });

            grid.set('models', data3[0]);
            verifyGridMatchesData(data3[0], grid, limit);

            grid.set('models', data1[0]);
            verifyGridMatchesData(data1[0], grid, limit);

            grid.set('models', data1[0]);
            verifyGridMatchesData(data1[0], grid, limit);

            setTimeout(start, 15);
        });
    }