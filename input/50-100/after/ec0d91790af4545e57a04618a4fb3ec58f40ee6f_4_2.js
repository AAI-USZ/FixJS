function(err, result) {
                test.equal(null, err);
                test.equal('good', result[0]._id.tags);
                test.deepEqual(['bob'], result[0].authors);
                test.equal('fun', result[1]._id.tags);
                test.deepEqual(['bob'], result[1].authors);

                db.close();
                test.done();
            }