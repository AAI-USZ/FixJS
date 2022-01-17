function(err,response) {
                    assert.isNull(err);
                    assert.isTrue(response.deleted);
                }