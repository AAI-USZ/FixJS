function(err, response) {
                assert.isNull(err);

                console.log("response", response);
                assert.isDefined(response);
                assert.equal(response.object, 'customer');
                assert.equal(response.email, "foo@example.com");

                customer = response;
            }