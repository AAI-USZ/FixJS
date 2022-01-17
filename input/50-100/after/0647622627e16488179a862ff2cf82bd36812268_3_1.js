function loadTasks(tasksdir) {
  try {
    var files = grunt.file.glob.glob('*.{js,coffee}', {cwd: tasksdir, maxDepth: 1});
    // Load tasks from files.
    files.forEach(function(filename) {
      loadTask(path.join(tasksdir, filename));
    });
  } catch(e) {
    grunt.log.verbose.error(e.stack).or.error(e);
  }
}