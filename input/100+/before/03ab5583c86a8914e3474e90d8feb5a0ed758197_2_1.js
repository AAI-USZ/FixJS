function(err, files){
    var funs = {};
    for(var i in files){
      (function(k){
        var file = files[i];
        funs[path.basename(file)] = function(callback){
          fs.readFile(file, function(err, json){
            var docs = JSON.parse(json);
            for(var i in docs){
              var doc = docs[i];
              // doc._id   = new ObjectID(doc._id);
              doc.start = new Date(doc.start);
              doc.stop  = new Date(doc.stop);
            }
            callback(err, docs);
          });
        };
      })(i);
    }
    console.log(funs);
    async.parallel(funs, function(err, results){
      fixtures = results;
      done();
    });
  }