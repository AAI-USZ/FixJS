function(err, collection){
    queryWithBenchmark(
      'getProgramListByDate',
      collection.find({cid: cid,
                       start: {$gte: start},
                       stop:  {$lte: stop}
                      }).sort(), callback);
  }