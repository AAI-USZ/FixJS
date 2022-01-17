function(cb) {
      if (Neat.root == null) {
        return puts(error("Can't run neat install outside of a Neat project."));
      }
      return fs.readFile('Nemfile', function(err, nemfile) {
        if (err) {
          return puts(error("No " + "Nemfile".red + " in the current directory"));
        }
        if (Neat.env.verbose) {
          puts("Nemfile found");
        }
        return render(__filename, function(err, source) {
          if (err != null) {
            return puts(error(err.message));
          }
          source = source.replace("###_NPM_DECLARATION_###", nemfile.toString());
          return run('coffee', ['-e', source], function() {
            puts("Your bundle is complete.".info);
            return typeof cb === "function" ? cb() : void 0;
          });
        });
      });
    }