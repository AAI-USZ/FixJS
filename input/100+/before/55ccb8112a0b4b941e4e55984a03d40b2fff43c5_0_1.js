function Toaster(basedir, options, skip_initial_build) {
      var config, contents, filepath, k, schema, v;
      if (options == null) {
        options = null;
      }
      if (skip_initial_build == null) {
        skip_initial_build = false;
      }
      this.basepath = basedir || path.resolve(".");
      this.cli = new toaster.Cli(options);
      if (options != null) {
        for (k in options) {
          v = options[k];
          this.cli.argv[k] = v;
        }
      }
      if (this.cli.argv.v) {
        filepath = pn(__dirname + "/../package.json");
        contents = fs.readFileSync(filepath, "utf-8");
        schema = JSON.parse(contents);
        return log(schema.version);
      } else if (this.cli.argv.n) {
        new toaster.generators.Project(this.basepath).create(this.cli.argv.n);
      } else if (this.cli.argv.i) {
        new toaster.generators.Config(this.basepath).create(this.cli.argv.i);
      } else if (this.cli.argv.w) {
        config = options && options.config ? options.config : null;
        this.toast = new toaster.Toast(this);
        if (!skip_initial_build) {
          this.build();
        }
      } else {
        return log(this.cli.opts.help());
      }
    }