function (err, data, original) {
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
  }