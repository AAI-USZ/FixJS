function(err,response) {
                    console.log("response", response);
                    assert.isNull(err);
                    assert.isTrue(response.deleted);
                }