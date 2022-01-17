function exec(file, tasks, options) {
  // TODO: Search up directories to find file, if necessary.
  
  require(file)(rivet);
  rivet.run(tasks, options, function(err) {
    // TODO: Write short error message to console.
    if (err) { throw err; }
  });
}