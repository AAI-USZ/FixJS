function() {
                testDB(Mongo.findTargetById('12345678901234567890abcd'), function(findResult) {
                   expect(findResult).toBe(null);
                });
            }