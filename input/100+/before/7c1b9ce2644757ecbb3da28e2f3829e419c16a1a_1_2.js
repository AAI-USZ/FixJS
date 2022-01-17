function() {
            var test = this;

            currentMock = function() {
                return {
                    error: {}
                }
            };

            Y.YQL('select * from weatherFOO.forecast where location=62896', {
                on: {
                    success: function(r) {
                        test.resume(function() {
                            Y.Assert.fail('Should not execute the success handler');
                        });
                    },
                    failure: function(r) {
                        test.resume(function() {
                            Y.Assert.isObject(r, 'Query Failure');
                        });
                    }
                }
            });

            this.wait();
        }