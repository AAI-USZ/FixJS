function(data, filters) {
      
      // get the names of the filters
      // {Sector:{ID:'NAME1'}, Funder:{ID:'Other Name'}} => ['NAME1', 'Other Name']
      var keys = _.flatten(_.map(filters, function(sectors,_k){
        return _.values(sectors);
      }));
      
      var dataFile = accessors.dataFile(data, params.groupby);
      var total = dataFile.totalActivities();
      var summaries = dataFile.transactionSummaries();

      res.render('data-file', {
        title: 'Data File',
        page: 'data-file',
        keys: keys,
        filter_paths: req.filter_paths,
        query: req.query,
        total_budget: summaries['C'],
        total_spend: summaries['D'] + summaries['E'] + summaries['R'],
        total_activities: total,
        current_page: req.query.p || 1,
        largeQuery: total > app.settings.largeQuery,
        layout: !req.isXHR
      });
    }