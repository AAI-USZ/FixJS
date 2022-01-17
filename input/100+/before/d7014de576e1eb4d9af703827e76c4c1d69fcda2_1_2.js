function(data) {
    var stats = runHCluster(data, opts);
    if(options.verbose)
      sys.inspect(stats);
    
    sys.puts("running time: " + stats.time + "ms");
    // cvvvvvvvvvvvvvvcvVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV F
    if(options.report) {
      var db = getDb(options.report);
      var report = {
        stats: stats,
        name: options.reportName,
        timestamp: new Date(),
        config: config
      }
      db.insert(report, function(err, res) {
        if(err)
          sys.puts("error sending report to " + option.report);
        else
          sys.puts("saved report " + options.report + "/" + res.id);
      }); 
    }
  }