function(err, response) {
                    assert.isNull(err);
                    
                    console.log('response', response);
                    assert.isDefined(response);
                    assert.equal(response.object, 'charge');
                    assert.equal(response.paid, true);
                }