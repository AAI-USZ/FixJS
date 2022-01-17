function () {
    Status.running = false;
    Status.listening = false;
    if (server_handle)
      kill_server(server_handle);
    if (test_server_handle)
      kill_server(test_server_handle);

    server_log = [];

    var errors = bundler.bundle(app_dir, bundle_path, bundle_opts);

    var deps_raw;
    try {
      deps_raw =
        fs.readFileSync(path.join(bundle_path, 'dependencies.json'), 'utf8');
    } catch (e) {
      if (!warned_about_no_deps_info) {
        process.stdout.write("No dependency info in bundle. " +
                             "Filesystem monitoring disabled.\n");
        warned_about_no_deps_info = true;
      }
    }

    if (deps_raw)
      deps_info = JSON.parse(deps_raw.toString());

    if (errors) {
      log_to_clients({stdout: "Errors prevented startup:\n"});
      _.each(errors, function (e) {
        log_to_clients({stdout: e + "\n"});
      });

      if (!deps_info) {
        // We don't know what files to watch for changes, so we have to exit.
        process.stdout.write("\nPlease fix the problem and restart.\n");

        // XXX calling process.exit like this leaves mongod running!
        // One solution would be to try to kill mongo in this case. Or
        // we could try to bundle before we launch mongo, so in this case
        // mongo would never have been started.
        process.exit(1);
      }
      start_watching();
      Status.hard_crashed();
      return;
    }

    start_watching();
    Status.running = true;
    server_handle = start_server(bundle_path, inner_port, mongo_url, function () {
      // on server exit
      Status.running = false;
      Status.listening = false;
      Status.soft_crashed();
      if (!Status.crashing)
        restart_server();
    }, function () {
      // on listen
      Status.listening = true;
      _.each(request_queue, function (f) { f(); });
      request_queue = [];
    });


    // launch test bundle and server if needed.
    if (test_bundle_opts) {
      var errors =
        bundler.bundle(app_dir, test_bundle_path, test_bundle_opts);
      if (errors) {
        log_to_clients({system: "Errors prevented test server from starting:"});
        _.each(errors, function (e) {
          log_to_clients({system: e});
        });
        files.rm_recursive(test_bundle_path);
      } else {
        test_server_handle = start_server(
          test_bundle_path, test_port, test_mongo_url, function () {
            // No restarting or crash loop prevention on the test server
            // for now. We'll see how annoying it is.
            log_to_clients({'system': "Test server crashed."});
          });
      }
    };
  }