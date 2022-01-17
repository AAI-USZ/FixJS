function(err, response) {
            assert.isNull(err);

            console.log('response', response);
            assert.isDefined(response);
            assert.equal(response.object, 'plan');
            assert.equal(response.id, 'foobarbaz_plan');

            plan = response;
        }