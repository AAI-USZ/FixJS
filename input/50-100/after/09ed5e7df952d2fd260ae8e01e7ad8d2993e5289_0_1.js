function(err, collection){
    queryWithBenchmark(
      'getProgramListByDate',
      collection.find({
        $and  : [
          { cid   : cid },
          { stop  : { $gt: start} },
          { start : { $lte: stop} }
        ]
      }).sort({"start": 1}), callback);
  }