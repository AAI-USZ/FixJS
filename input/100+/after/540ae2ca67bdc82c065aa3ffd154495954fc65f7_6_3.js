function(iface, scan) {
    var rdb, stations, w, _ref, _ref1;
    if (scan == null) {
      scan = true;
    }
    stations = {
      complete: [],
      inProgress: [],
      noHistory: []
    };
    rdb = new db((_ref = rtard.reaverPath) != null ? _ref : config.REAVER_DEFAULT_PATH, (_ref1 = rtard.rdbFile) != null ? _ref1 : config.REAVER_DEFAULT_DBFILE);
    if (iface == null) {
      iface = config.DEFAULT_INTERFACE;
    }
    w = new wash(config.WASH_DEFAULT_ARGS(iface, scan));
    process.on('exit', function() {
      return w.stop();
    });
    cli._c.foreground(250);
    rtard.prompt(' *** Press enter to move on to next step ***', function() {
      w.stop();
      return process.nextTick(function() {
        return reviewTargets.apply(null, [stations]);
      });
    });
    w.on('ap', function(station) {
      return rdb.checkSurvey(station.bssid, function(err, rows) {
        var device, k, v;
        if (!err && rows.length > 0) {
          device = {
            name: rows[0].device_name,
            manufacturer: rows[0].manufacturer,
            model: rows[0].model_name,
            number: rows[0].model_number
          };
          for (k in device) {
            v = device[k];
            if (v !== '') {
              station.device = device;
            }
          }
        }
        return rdb.checkHistory(station.bssid, function(err, rows) {
          var _ref2, _ref3;
          if (err) {
            console.error(errd);
          }
          if (rows.length > 0) {
            _ref2 = rows[0];
            for (k in _ref2) {
              v = _ref2[k];
              if ((_ref3 = station[k]) == null) {
                station[k] = v;
              }
            }
            station.session = rdb.loadSession(station.bssid);
            if (station.attempts >= 11000 || station.session.phase === 2) {
              stations.complete.push(station);
              station.category = 'C';
            } else {
              stations.inProgress.push(station);
              station.category = 'W';
            }
          } else {
            stations.noHistory.push(station);
            station.category = 'N';
          }
          return cli.washHit(station, station.category);
        });
      });
    });
    w.on('error', function() {
      return console.error("ERROR: " + arguments);
    });
    w.start();
    return cli.cwrite('magenta', ' Wash scan has been started, now waiting for AP data...\n\n');
  }