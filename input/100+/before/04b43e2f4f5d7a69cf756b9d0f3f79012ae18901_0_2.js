function install (args) {
  config.check();
  var appname = config.appname,
    p = args;

  if (args.length && !appname) {
    appname = args[0];
    p = args.splice(1);
  }

  if (!p.length) {
    if (exists('package.json')) {
      log.info('grabbing dependencies from package.json...');
      var depen = JSON.parse(fs.readFileSync('package.json')).dependencies;
      if (!depen) {
        log.error('no depedencies found!');
      } else {
        p = [];
        for (var dep in depen) {
          p.push(dep);
        }
      }
    } else {
      log.error('no packages to install!');
    }
  }

  // fix to avoid the read of appname as a module
  if (p.hasOwnProperty('length')) { // double check for typeof array
    p = p.filter(function(pack){
      return pack != appname;
    });
  }

  var o = p.map(function(pack){
    return encodeURIComponent(escape(unescape(pack)));
  });

  log.info('installing to app:', appname);
  log.info('installing these npm packages:', p);
  var nodeapi = new Node(config.username, config.password, config.apihost, config.apisecure);
  nodeapi.appnpm_install(appname, o.join(' '), function (err, data, original) {
    if (err) {
      log.error(err.message);
    }
    if (data.output) {
      var out = data.output.split('\n');
      out.forEach(function (l) {
        if (l.indexOf('stdout: ') === -1) {
          if (l.length > 1) {
            l = l.replace('stderr: ', '');
            l = l.split(' ');
            l[0] = l[0].magenta;
            if (l[1]) {
              if (l[1].toLowerCase() === 'warn') {
                l[1] = l[1].red;
              } else if (l[1].toLowerCase() === 'erro') {
                l[1] = l[1].red.inverse.bold;
              } else {
                l[1] = l[1].white;
              }
            }
            log.usage(l.join(' '));
          }
        }
      });
    }
    log.plain('');
    log.info('Dependencies installed');
    log.info('Attemping to restart app:', appname);
    nodeapi.app_restart(appname, function (err, data, original) {
      if (err) {
        log.error(err.message);
      }
      if (data.status == "success") {
        log.info('app restarted.'.bold.green);
        log.info('ok!'.green.bold);
      } else {
        log.warn(data.status);
      }
    });
  });
}