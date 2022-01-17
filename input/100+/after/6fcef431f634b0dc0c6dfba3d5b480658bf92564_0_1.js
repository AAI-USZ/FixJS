function(req, res, next) {
    var appname     = req.param("appname").toLowerCase()
      , action      = req.param("action")
      , package     = req.param("package")
      , user        = req.user
      , app         = req.app
      , good_action = false;

    switch (action) {
      case "install":
      case "update":
      case "uninstall":
      case "list":
        good_action = true;
        break;
    }
    if (good_action === true) {
      var app_user_home = path.join(config.opt.apps_home_dir, app.username, app.repo_id + '_rw')
        , app_user_npm_home = path.join(config.opt.apps_home_dir, app.username, app.repo_id);
      log.info(action + " " + package + " into " + app_user_home);
      var sep = ' ';
      if (package.indexOf(',') > -1) {
        sep = ',';
        package = package.replace(/ /g, '');
      }
      // Support for http://github.com/username/module/tarball/master
      // and module@0.1.1 type of modules
      var p = unescape(decodeURIComponent(package)).split(sep);

      p.forEach(function(v, k) {
        p[k] = lib.escape_packages(v);
      });
      // TODO Fix umask for this process
      var node_version
        , process_version = process.version.replace('v','')
        //, force = false
        ;
      // in the package what type of data is? #TODO
      // always a try/catch for avoid mistakes and exceptions on the package.json read operation
      // Due to #322, try to force the installation to the location of server|index|app.js
      // the force command is going to install the node_modules inside the original path and not to
      // chroot
      try {
        var jsonFile = JSON.parse(fs.readFileSync(app_user_npm_home + '/package.json', 'utf8'));
        node_version = jsonFile['node'].replace('v','');
        //force = jsonFile['npm'] && jsonFile['npm'] === 'force' ? true :false ;
      } catch(e){
        node_version = process_version;
      }
      // I read the package.json but there is not a "node" key-value
      node_version = node_version === undefined ? process_version : node_version;
      if (node_versions.indexOf(node_version)===-1) {
        // I have a valid version, BUT nodester doesn't have it installed
        node_version = process_version;
      }
      // Inherit the installation to n, but n throw an error if the version is lower than 0.6.3
      var command = 'n npm ' + node_version;
      if (parseFloat(node_version) < 0.6 ){
        command = 'npm ';
      }
      var node_modules = app_user_home;
      // if (force) node_modules = app_user_npm_home;
      package = p.join(' ')
      var cmd = 'cd ' + node_modules + '; if [ ! -d node_modules ]; then mkdir node_modules; fi; '+ command  
                      + ' ' + action + ' ' + package;
      var pr = exec(cmd, function(err, stdout, stderr) {
        res.send({
          status: 'success',
          output: "stdout: " + stdout + "\nstderr: " + stderr
        });
      });
    } else {
      res.error(400, "failure - invalid action parameter");
    }
  }