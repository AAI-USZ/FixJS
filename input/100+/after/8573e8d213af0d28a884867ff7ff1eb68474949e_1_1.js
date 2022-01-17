function runHCluster(data, options) {
  util.puts("\nrunning hcluster test on data size: " 
     + Math.min(data.length, options.length))

  eval("var distance = " + options.distance);
  eval("var merge = " + options.merge);
  
  var items = data.slice(0, options.length).map(function(doc) {
    return doc.data;
  })
  var t1 = Date.now();
  var clusters = clusterfck.hcluster(items, distance, merge, options.threshold);
  var t2 = Date.now();
  
  util.puts("ending cluster count: " + clusters.length);
  return {
    'time' : t2 - t1,
    'clusters' : clusters
  };
}