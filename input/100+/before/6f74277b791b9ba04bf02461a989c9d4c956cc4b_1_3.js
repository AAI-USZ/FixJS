function() {
  var optimist = require('optimist')
    .alias("h", "help")
    .boolean("h")
    .boolean("help")
    .boolean("version")
    .boolean("debug");

  var argv = optimist.argv;

  if (argv.help) {
    argv._.splice(0, 0, "help");
    delete argv.help;
  }

  if (argv.version) {
    var updater = require('../lib/updater.js');
    var sha = updater.git_sha();

    process.stdout.write("Meteor version " + updater.CURRENT_VERSION);

    if (files.in_checkout())
      process.stdout.write(" (git checkout)");
    else if (sha)
      process.stdout.write(" (" + sha.substr(0, 10) + ")");

    process.stdout.write("\n");
    process.exit(0);
  }

  var cmd = 'run';
  if (argv._.length)
    cmd = argv._.splice(0,1)[0];

  findCommand(cmd).func(argv);
}