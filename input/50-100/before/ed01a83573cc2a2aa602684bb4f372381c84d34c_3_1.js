function(err, response) {
            assert.isNull(err);
            console.log('response', response);
            assert.isDefined(response);
            assert.equal(response.object, 'plan');
            assert.equal(response.id, 'foobarbaz_plan');
            assert.equal(response.interval, 'year');
            assert.equal(response.amount, 2000);
            
            plans.push(response);
        }