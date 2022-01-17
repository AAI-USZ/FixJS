function exec(file, tasks, options) {
  require(file)(rivet);
  rivet.run(tasks, options, function(err) {
    if (err) {
      console.error(err.message);
      if (options.trace) { console.error(err.stack); }
    }
  });
}