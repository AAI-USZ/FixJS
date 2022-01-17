function(err, response) {
            assert.isNull(err);
            assert.isDefined(response);
            assert.equal(response.object, 'charge');
            assert.isDefined(response.id);
        }