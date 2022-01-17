function(pipeline, options, callback) {
  var args = Array.prototype.slice.call(arguments, 1);
  callback = args.pop();
  options = args.length ? args.shift() : {};
  var self = this;

  if(!Array.isArray(pipeline)) return callback(new Error("pipline must be an array"));

  // Check if we have more than one argument then just make the pipeline
  // the remaining arguments
  if(args.length > 1) {
    pipeline = args;
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