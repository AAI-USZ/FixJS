function (argv) {
    // reparse args
    var opt = require('optimist')
          .describe('example', 'Example template to use.')
          .boolean('list')
          .describe('list', 'Show list of available examples.')
          .usage(
"Usage: meteor create <name>\n" +
"       meteor create --example <example_name> [<name>]\n" +
"       meteor create --list\n" +
"\n" +
"Make a subdirectory named <name> and create a new Meteor project\n" +
"there. You can also pass an absolute or relative path.\n" +
"\n" +
"You can pass --example to start off with a copy of one of the Meteor\n" +
"sample applications. Use --list to see the available examples.");

    var new_argv = opt.argv;
    var appname;

    var example_dir = path.join(__dirname, '../../examples');
    var examples = _.reject(fs.readdirSync(example_dir), function (e) {
      return (e === 'unfinished');
    });

    if (argv._.length === 1) {
      appname = argv._[0];
    } else if (argv._.length === 0 && new_argv.example) {
      appname = new_argv.example;
    }

    if (new_argv['list']) {
      process.stdout.write("Available examples:\n");
      _.each(examples, function (e) {
        process.stdout.write("  " + e + "\n");
      });
      process.stdout.write("\n" +
"Create a project from an example with 'meteor create --example <name>'.\n")
      process.exit(1);
    };

    if (argv.help || !appname) {
      process.stdout.write(opt.help());
      process.exit(1);
    }

    if (path.existsSync(appname)) {
      process.stderr.write(appname + ": Already exists\n");
      process.exit(1);
    }

    if (files.find_app_dir(appname)) {
      process.stderr.write(
"You can't create a Meteor project inside another Meteor project.\n");
      process.exit(1);
    }

    var transform = function (x) {
      return x.replace(/~name~/g, path.basename(appname));
    };

    if (new_argv.example) {
      if (examples.indexOf(new_argv.example) === -1) {
        process.stderr.write(new_argv.example + ": no such example\n\n");
        process.stderr.write("List available applications with 'meteor create --list'.\n");
        process.exit(1);
      } else {
        files.cp_r(path.join(example_dir, new_argv.example), appname, {
          ignore: [/^local$/]
        });
      }
    } else {
      files.cp_r(path.join(__dirname, 'skel'), appname, {
        transform_filename: function (f) {
          return transform(f);
        },
        transform_contents: function (contents, f) {
          if ((/(\.html|\.js|\.css)/).test(f))
            return new Buffer(transform(contents.toString()));
          else
            return contents;
        },
        ignore: [/^local$/]
      });
    }

    process.stderr.write(appname + ": created");
    if (new_argv.example &&
        new_argv.example !== appname)
      process.stderr.write(" (from '" + new_argv.example + "' template)");
    process.stderr.write(".\n\n");

    process.stderr.write(
"To run your new app:\n" +
"   cd " + appname + "\n" +
"   meteor\n");
  }