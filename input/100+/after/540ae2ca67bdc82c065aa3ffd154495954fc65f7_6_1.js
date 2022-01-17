function(err, rows) {
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
        }