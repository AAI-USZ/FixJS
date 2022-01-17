function(err, response) {
                        assert.isNull(err);

                        console.log('response', response);
                        assert.isDefined(response);
                        assert.isArray(response.data);
                        assert.strictEqual(response.data.length > 0, true);

                        var invoice = response.data[0];
                        assert.isObject(invoice);
                        assert.equal(invoice.object, 'invoice');
                    }