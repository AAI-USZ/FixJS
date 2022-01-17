function(tasks, options) {
  if (!options) { options = {}; }

  // Load all built-in tasks.
  var tasksdir = path.resolve(__dirname, '../../tasks');
  task.searchDirs.unshift(tasksdir);
  loadTasksMessage('built-in');
  loadTasks(tasksdir);

  // Grunt was loaded from a Npm-installed plugin bin script. Load any tasks
  // that were specified via grunt.npmTasks.
  grunt._npmTasks.forEach(loadNpmTasksWithRequire);

  // Were only init tasks specified?
  var allInit = tasks.length > 0 && tasks.every(function(name) {
    var obj = task._taskPlusArgs(name).task;
    return obj && obj.init;
  });

  // Get any local configfile or tasks that might exist. Use --config override
  // if specified, otherwise search the current directory or any parent.
  var configfile = allInit ? null : grunt.option('config') ||
    grunt.file.findup(process.cwd(), 'grunt.js');

  var msg = 'Reading "' + path.basename(configfile) + '" config file...';
  if (configfile && path.existsSync(configfile)) {
    grunt.verbose.writeln().write(msg).ok();
    // Change working directory so that all paths are relative to the
    // configfile's location (or the --base option, if specified).
    process.chdir(grunt.option('base') || path.dirname(configfile));
    // Load local tasks, if the file exists.
    loadTask(configfile);
  } else if (options.help || allInit) {
    // Don't complain about missing config file.
  } else if (grunt.option('config')) {
    // If --config override was specified and it doesn't exist, complain.
    grunt.log.writeln().write(msg).error();
    grunt.fatal('Unable to find "' + configfile + '" config file.', 2);
  } else if (!grunt.option('help')) {
    grunt.verbose.writeln().write(msg).error();
    grunt.fatal('Unable to find "grunt.js" config file. Do you need any --help?', 2);
  }

  // Load all user-specified --npm tasks.
  (grunt.option('npm') || []).forEach(task.loadNpmTasks);
  // Load all user-specified --tasks.
  (grunt.option('tasks') || []).forEach(task.loadTasks);

  // Load user .grunt tasks.
  tasksdir = grunt.file.userDir('tasks');
  if (tasksdir) {
    task.searchDirs.unshift(tasksdir);
    loadTasksMessage('user');
    loadTasks(tasksdir);
  }

  // Search dirs should be unique and fully normalized absolute paths.
  task.searchDirs = grunt.utils._.uniq(task.searchDirs).map(function(filepath) {
    return path.resolve(filepath);
  });
}