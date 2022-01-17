function(err, response) {
            assert.isNull(err);

            assert.isDefined(response);
            assert.equal(response.object, 'plan');
            assert.equal(response.id, 'foobarbaz_plan');

            plan = response;
        }