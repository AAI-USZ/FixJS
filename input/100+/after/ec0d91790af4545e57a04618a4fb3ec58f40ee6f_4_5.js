function(err, result){

      if(parseInt((result.version.replace(/\./g, ''))) >= 210) {
        // Create a collection
        client.createCollection('shouldCorrectlyExecuteSimpleAggregationPipelineUsingArguments', function(err, collection) {
          // Insert the docs
          collection.insert(docs, {safe:true}, function(err, result) {
            // Execute aggregate, notice the pipeline is expressed as function call parameters
            // instead of an Array.
            collection.aggregate(
                { $project : {
                	author : 1,
                	tags : 1
                }},
                { $unwind : "$tags" },
                { $group : {
                 _id : { tags : 1 },
                 authors : { $addToSet : "$author" }
                }}
              , function(err, result) {
                test.equal(null, err);
                test.equal('good', result[0]._id.tags);
                test.deepEqual(['bob'], result[0].authors);
                test.equal('fun', result[1]._id.tags);
                test.deepEqual(['bob'], result[1].authors);

                db.close();
                test.done();
            });
          });
        });
      } else {
        db.close();
        test.done();
      }
    }