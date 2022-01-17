function(data) {
    var stats = runHCluster(data, opts);
    if(options.verbose)
      util.inspect(stats);
    
    util.puts("running time: " + stats.time + "ms");
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
          util.puts("error sending report to " + option.report);
        else
          util.puts("saved report " + options.report + "/" + res.id);
      }); 
    }
  }