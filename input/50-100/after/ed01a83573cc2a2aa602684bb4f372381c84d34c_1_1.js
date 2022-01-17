function(err, response) {
            assert.isNull(err);
            assert.isDefined(response);
            assert.equal(response.object, 'customer');
            assert.equal(response.email, "foo@example.com");
        }