function(err, response) {
                assert.isNull(err);
                assert.isDefined(response);
                assert.equal(response.object, 'plan');
                assert.equal(response.id, 'bazbarfoo_plan');
                assert.equal(response.interval, 'month');
                assert.equal(response.amount, 4000);
                
                plans.push(response);
            }