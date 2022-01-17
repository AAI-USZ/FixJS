function(err, result) {
          // Execute aggregate
          collection.aggregate(
              [{ $project : {
              	author : 1,
              	tags : 1,
              }},
              { $unwind : "$tags" },
              { $group : {
              	_id : { tags : 1 },
              	authors : { $addToSet : "$author" }
              }}],
              {explain:true}
            , function(err, result) {
              test.equal(null, err);
              test.ok(result['serverPipeline'] != null);
              test.done();              
          });
        }