function (output_path, project_dir, dev_bundle_mode) {
    var self = this;
    var app_json = {};
    var dependencies_json = {core: [], app: [], packages: {}};
    var is_app = files.is_app_dir(project_dir);

    if (is_app)
      dependencies_json.app.push('.meteor/packages');

    // --- Set up build area ---

    // foo/bar => foo/.build.bar
    var build_path = path.join(path.dirname(output_path),
                               '.build.' + path.basename(output_path));

    // XXX cleaner error handling. don't make the humans read an
    // exception (and, make suitable for use in automated systems)
    files.rm_recursive(build_path);
    files.mkdir_p(build_path, 0755);

    // --- Core runner code ---

    files.cp_r(path.join(__dirname, '../server'),
               path.join(build_path, 'server'), {ignore: ignore_files});
    dependencies_json.core.push('server');

    // --- Third party dependencies ---

    if (dev_bundle_mode === "symlink")
      fs.symlinkSync(path.join(files.get_dev_bundle(), 'lib/node_modules'),
                     path.join(build_path, 'server/node_modules'));
    else if (dev_bundle_mode === "copy")
      files.cp_r(path.join(files.get_dev_bundle(), 'lib/node_modules'),
                 path.join(build_path, 'server/node_modules'),
                 {ignore: ignore_files});
    else
      /* dev_bundle_mode === "skip" */;

    fs.writeFileSync(
      path.join(build_path, 'server', '.bundle_version.txt'),
      fs.readFileSync(
        path.join(files.get_dev_bundle(), '.bundle_version.txt')));

    // --- Static assets ---

    if (is_app) {
      if (path.existsSync(path.join(project_dir, 'public'))) {
        files.cp_r(path.join(project_dir, 'public'),
                   path.join(build_path, 'static'), {ignore: ignore_files});
      }
      dependencies_json.app.push('public');
    }

    // -- Client code --
    for (var rel_path in self.files.client) {
      var full_path = path.join(build_path, 'static', rel_path);
      files.mkdir_p(path.dirname(full_path), 0755);
      fs.writeFileSync(full_path, self.files.client[rel_path]);
    }

    // -- Client cache forever code --
    for (var rel_path in self.files.client_cacheable) {
      var full_path = path.join(build_path, 'static_cacheable', rel_path);
      files.mkdir_p(path.dirname(full_path), 0755);
      fs.writeFileSync(full_path, self.files.client_cacheable[rel_path]);
    }

    // -- Add query params to client js and css --
    // This busts through browser caches when files change.
    var add_query_param = function (file) {
      if (file in self.files.client_cacheable)
        return file;
      else if (file in self.files.client) {
        var hash = crypto.createHash('sha1');
        hash.update(self.files.client[file]);
        var digest = hash.digest('hex');
        return file + "?" + digest;
      }
      // er? file we don't know how to serve? thats not right...
      return file;
    };
    self.js.client = _.map(self.js.client, add_query_param);
    self.css = _.map(self.css, add_query_param);

    // ---  Server code and generated files ---

    app_json.load = [];
    files.mkdir_p(path.join(build_path, 'app'), 0755);
    for (var rel_path in self.files.server) {
      var path_in_bundle = path.join('app', rel_path);
      var full_path = path.join(build_path, path_in_bundle);
      app_json.load.push(path_in_bundle);
      files.mkdir_p(path.dirname(full_path), 0755);
      fs.writeFileSync(full_path, self.files.server[rel_path]);
    }

    fs.writeFileSync(path.join(build_path, 'app.html'),
                     self._generate_app_html());
    dependencies_json.core.push('lib/app.html.in');

    fs.writeFileSync(path.join(build_path, 'unsupported.html'),
                     fs.readFileSync(path.join(__dirname, "unsupported.html")));
    dependencies_json.core.push('lib/unsupported.html');

    // --- Documentation, and running from the command line ---

    fs.writeFileSync(path.join(build_path, 'main.js'),
"require(require('path').join(__dirname, 'server/server.js'));\n");

    fs.writeFileSync(path.join(build_path, 'README'),
"This is a Meteor application bundle. It has only one dependency,\n" +
"node.js (with the 'fibers' package). To run the application:\n" +
"\n" +
"  $ npm install fibers\n" +
"  $ export MONGO_URL='mongodb://user:password@host:port/databasename'\n" +
"  $ node main.js\n" +
"\n" +
"Use the PORT environment variable to set the port where the\n" +
"application will listen. The default is 80, but that will require\n" +
"root on most systems.\n" +
"\n" +
"Find out more about Meteor at meteor.com.\n");

    // --- Metadata ---

    dependencies_json.extensions = self._app_extensions();
    dependencies_json.exclude = _.pluck(ignore_files, 'source');
    dependencies_json.packages = {};
    for (var id in self.packages) {
      var inst = self.packages[id];
      if (inst.pkg.name)
        dependencies_json.packages[inst.pkg.name] = _.keys(inst.dependencies);
    }

    fs.writeFileSync(path.join(build_path, 'app.json'),
                     JSON.stringify(app_json));
    fs.writeFileSync(path.join(build_path, 'dependencies.json'),
                     JSON.stringify(dependencies_json));

    // --- Move into place ---

    // XXX cleaner error handling (no exceptions)
    files.rm_recursive(output_path);
    fs.renameSync(build_path, output_path);
  }