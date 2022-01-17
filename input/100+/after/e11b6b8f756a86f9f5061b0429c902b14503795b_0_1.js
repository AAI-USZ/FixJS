function(argv, stdin, stdout) {
  argv || (argv = process.argv.slice(2));

  if (argv.length < 1) {
    console.error('Usage: node debug script.js');
    process.exit(1);
  }

  // Setup input/output streams
  stdin = stdin || process.openStdin();
  stdout = stdout || process.stdout;

  var args = ['--debug-brk'].concat(argv),
      interface_ = new Interface(stdin, stdout, args);

  stdin.resume();

  process.on('uncaughtException', function(e) {
    console.error("There was an internal error in Node's debugger. " +
        'Please report this bug.');
    console.error(e.message);
    console.error(e.stack);
    if (interface_.child) interface_.child.kill();
    process.exit(1);
  });
}