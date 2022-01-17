function(pipeline, options, callback) {
  // *  - **explain** {Boolean}, return the query plan for the aggregation pipeline instead of the results. 2.3, 2.4
  var args = Array.prototype.slice.call(arguments, 0);
  callback = args.pop();
  var self = this;
  // Get the right options
  options = args[args.length - 1].explain ? args.pop() : {}

  // Convert operations to an array
  if(!Array.isArray(args[0])) {
    pipeline = [];
    // Push all the operations to the pipeline
    for(var i = 0; i < args.length; i++) pipeline.push(args[i]);
  }

  // Build the command
  var command = { aggregate : this.collectionName, pipeline : pipeline};
  // Add all options
  var keys = Object.keys(options);
  // Add all options
  for(var i = 0; i < keys.length; i++) {
    command[keys[i]] = options[keys[i]];
  }

  // Execute the command
  this.db.command(command, options, function(err, result) {
    if(err) {
      callback(err);
    } else if(result['err'] || result['errmsg']) {
      callback(self.db.wrap(result));
    } else if(typeof result == 'object' && result['serverPipeline']) {
      callback(null, result);
    } else {
      callback(null, result.result);
    }
  });
}