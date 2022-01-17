function(err, rows) {
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
      }