function(test) {
  var db = new Db('integration_tests', new Server("127.0.0.1", 27017,
   {auto_reconnect: false, poolSize: 4, ssl:useSSL}), {native_parser: native_parser});

  // Establish connection to db
  db.open(function(err, db) {
    // Some docs for insertion
    var docs = [{
        title : "this is my title", author : "bob", posted : new Date() ,
        pageViews : 5, tags : [ "fun" , "good" , "fun" ], other : { foo : 5 },
        comments : [
          { author :"joe", text : "this is cool" }, { author :"sam", text : "this is bad" }
        ]}];

    // Validate that we are running on at least version 2.1 of MongoDB
    db.admin().serverInfo(function(err, result){

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
    });
  });
}