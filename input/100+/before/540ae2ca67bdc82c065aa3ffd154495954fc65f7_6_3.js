function(scan) {
    var rdb, stations, w;
    if (scan == null) scan = true;
    stations = {
      complete: [],
      inProgress: [],
      noHistory: []
    };
    rdb = new db();
    w = new wash({
      interface: 'mon0',
      scan: scan,
      ignoreFCS: true
    });
    process.on('exit', function() {
      return w.stop();
    });
    cli._c.on('^C', function() {
      w.stop();
      cli._c.display('reset');
      return process.exit();
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
            if (v !== '') station.device = device;
          }
        }
        return rdb.checkHistory(station.bssid, function(err, rows) {
          var k, v, _ref, _ref2;
          if (err) console.error(errd);
          if (rows.length > 0) {
            _ref = rows[0];
            for (k in _ref) {
              v = _ref[k];
              if ((_ref2 = station[k]) == null) station[k] = v;
            }
            station.session = rdb.loadSession(station.bssid);
            if (station.attempts >= 11000 || station.session.phase === 2) {
              stations.complete.push(station);
              return cli.washHit(station, 'C');
            } else {
              stations.inProgress.push(station);
              return cli.washHit(station, 'W');
            }
          } else {
            stations.noHistory.push(station);
            return cli.washHit(station, 'N');
          }
        });
      });
    });
    w.on('exit', function() {
      console.log('wash process ended, beginning review');
      return targetReview(stations);
    });
    w.on('error', function() {
      return console.error("ERROR: " + arguments);
    });
    w.start();
    cli.cwrite('magenta', ' Wash scan now in progress, waiting for AP data...\n').cwrite('blue', ' (Press enter when satisfied with results to continue)');
    return rtard.prompt('\n', function(res) {
      w.stop();
      return console.log(res);
    });
  }