function(err, stdout, stderr) {
        var ifrow, isIfaces, line, lines, monok, oniface, proc, results, section, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        isIfaces = false;
        results = {};
        if (err) {
          throw err;
        } else if (stdout) {
          _ref = stdout.split('\n\n');
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            section = _ref[_i];
            lines = section.split('\n');
            if (lines[0] === 'PID\tName') {
              results.processes = {};
              _ref1 = lines.slice(1);
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                line = _ref1[_j];
                proc = /(\d+)\t(\w+)/.exec(line);
                if (proc) {
                  results.processes[proc[1]] = {
                    pid: proc[1],
                    name: proc[2]
                  };
                } else {
                  oniface = /Process with PID (\d+) \((.*)\) is running on interface (.*)/.exec(line);
                  if (oniface) {
                    results.processes[oniface[1]].runningOn = oniface[3];
                  }
                }
              }
            }
            if (/Interface\tChipset\t\tDriver/g.test(section)) {
              isIfaces = true;
            } else if (isIfaces) {
              isIfaces = false;
              results.interfaces = [];
              for (_k = 0, _len2 = lines.length; _k < _len2; _k++) {
                line = lines[_k];
                ifrow = /([^\t]+)\t+([^\t]+)\t+(\w+)\s-\s\[(\w+)\](\s+\(removed\))?/.exec(line);
                if (ifrow) {
                  results.interfaces.push({
                    "interface": ifrow[1],
                    chipset: ifrow[2],
                    driver: ifrow[3],
                    phyid: ifrow[4],
                    removed: ifrow[5] === ' (removed)'
                  });
                } else {
                  monok = /\s+\(monitor mode enabled on (\w+)\)/.exec(line);
                  if (monok) {
                    results.enabledOn = monok[1];
                  }
                }
              }
            }
          }
          return cb(results, stdout, stderr);
        }
      }