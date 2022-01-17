function(err) {
      var groupedDatasets = _.chain(_.values(results))
        .map(buildDatasetObject)
        .filter(function(i) { return groupMatchingDatasets(i, options.groupPattern) != "ungrouped"; })
        .groupBy(function(i) { return groupMatchingDatasets(i, options.groupPattern); })
        .map(function(x) { return combineGroupedDatasets(x, options, directory); })
        .groupBy(getDatasetTime)
        .sortBy(function(v, k) { return k; })
        .reverse()
        .value();
      
      var scanResult = filterGroupedDatasetsToPage(groupedDatasets, options);
      scanResult.directory = directory;
      
      async.map(scanResult.datasets, 
        _.bind(populateAuthor, {'directory': directory}), 
        function(err, datasets) {
          scanResult.datasets = datasets;
          callback(null, scanResult); 
        });
      
    }