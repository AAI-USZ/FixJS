function(err, nemfile) {
        if (err) {
          return error("No " + "Nemfile".red + " in the current directory");
        }
        puts("Nemfile found");
        return render(__filename, function(err, source) {
          if (err != null) {
            return error(err.message);
          }
          source = source.replace("###_NPM_DECLARATION_###", nemfile.toString());
          return run('coffee', ['-e', source], function() {
            info("Your bundle is complete.".info);
            return typeof cb === "function" ? cb() : void 0;
          });
        });
      }