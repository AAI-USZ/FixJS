function(err, response) {
                var p = getFirstPlan();

                assert.isNull(err);
                assert.isDefined(response);
                assert.equal(response.id, p.id);
            }