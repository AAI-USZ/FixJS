function(test) {
  // Some docs for insertion
  var docs = [{
      title : "this is my title", author : "bob", posted : new Date() ,
      pageViews : 5, tags : [ "fun" , "good" , "fun" ], other : { foo : 5 },
      comments : [
        { author :"joe", text : "this is cool" }, { author :"sam", text : "this is bad" }
      ]}];
   
  client.admin().serverInfo(function(err, result){
    if(parseInt((result.version.replace(/\./g, ''))) >= 210) {
      // Create a collection   
      client.createCollection('shouldCorrectlyFailAndReturnError', function(err, collection) {
        // Insert the docs
        collection.insert(docs, {safe:true}, function(err, result) {
          // Execute aggregate
          collection.aggregate(
              { $project : {
              	author : 1,
              	tags : 1,
              }},
              { $32unwind : "$tags" },
              { $group : {
              	_id : { tags : 1 },
              	authors : { $addToSet : "$author" }
              }}
            , function(err, result) {
              test.ok(err != null);
              test.done();              
          });
        });
      });
    } else {
      test.done();
    }
  });
}