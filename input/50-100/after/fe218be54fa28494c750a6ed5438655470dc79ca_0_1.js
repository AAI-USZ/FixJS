function(err, grid) {
                if (err) throw err;
                grid.encode('utf', {resolution: 4}, function(err,utf) {
                    assert.equal(JSON.stringify(utf), reference);
                    done();
                });
            }