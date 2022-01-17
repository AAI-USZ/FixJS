function (config, oldConfig) {
  if (! config.debug && debugInt) {
    clearInterval(debugInt);
    debugInt = false;
  }

  l = new logger.Logger(config.log || {});

  if (config.debug) {
    if (debugInt !== undefined) {
      clearInterval(debugInt);
    }
    debugInt = setInterval(function () {
      l.log("Counters:\n" + util.inspect(counters) +
               "\nTimers:\n" + util.inspect(timers) +
               "\nGauges:\n" + util.inspect(gauges), 'debug');
    }, config.debugInterval || 10000);
  }

  if (server === undefined) {

    // key counting
    var keyFlushInterval = Number((config.keyFlush && config.keyFlush.interval) || 0);

    server = dgram.createSocket('udp4', function (msg, rinfo) {
      counters["statsd.packets_received"]++;
      var metrics = msg.toString().split("\n");

      for (midx in metrics) {
        if (config.dumpMessages) {
          l.log(metrics[midx].toString());
        }
        var bits = metrics[midx].toString().split(':');
        var key = bits.shift()
                      .replace(/\s+/g, '_')
                      .replace(/\//g, '-')
                      .replace(/[^a-zA-Z_\-0-9\.]/g, '');

        if (keyFlushInterval > 0) {
          if (! keyCounter[key]) {
            keyCounter[key] = 0;
          }
          keyCounter[key] += 1;
        }

        if (bits.length == 0) {
          bits.push("1");
        }

        for (var i = 0; i < bits.length; i++) {
          var sampleRate = 1;
          var fields = bits[i].split("|");
          if (fields[1] === undefined) {
              l.log('Bad line: ' + fields);
              counters["statsd.bad_lines_seen"]++;
              stats['messages']['bad_lines_seen']++;
              continue;
          }
          if (fields[1].trim() == "ms") {
            if (! timers[key]) {
              timers[key] = [];
            }
            timers[key].push(Number(fields[0] || 0));
          } else if (fields[1].trim() == "g") {
            gauges[key] = Number(fields[0] || 0);
          } else {
            if (fields[2] && fields[2].match(/^@([\d\.]+)/)) {
              sampleRate = Number(fields[2].match(/^@([\d\.]+)/)[1]);
            }
            if (! counters[key]) {
              counters[key] = 0;
            }
            counters[key] += Number(fields[0] || 1) * (1 / sampleRate);
          }
        }
      }

      stats['messages']['last_msg_seen'] = Math.round(new Date().getTime() / 1000);
    });

    mgmtServer = net.createServer(function(stream) {
      stream.setEncoding('ascii');

      stream.on('data', function(data) {
        var cmdline = data.trim().split(" ");
        var cmd = cmdline.shift();

        switch(cmd) {
          case "help":
            stream.write("Commands: stats, counters, timers, gauges, delcounters, deltimers, delgauges, quit\n\n");
            break;

          case "stats":
            var now    = Math.round(new Date().getTime() / 1000);
            var uptime = now - startup_time;

            stream.write("uptime: " + uptime + "\n");

            var stat_writer = function(group, metric, val) {
              var delta;

              if (metric.match("^last_")) {
                delta = now - val;
              }
              else {
                delta = val;
              }

              stream.write(group + "." + metric + ": " + delta + "\n");
            };

            // Loop through the base stats
            for (group in stats) {
              for (metric in stats[group]) {
                stat_writer(group, metric, stats[group][metric]);
              }
            }

            backendEvents.once('status', function(writeCb) {
              stream.write("END\n\n");
            });

            // Let each backend contribute its status
            backendEvents.emit('status', function(err, name, stat, val) {
              if (err) {
                l.log("Failed to read stats for backend " +
                         name + ": " + err);
              } else {
                stat_writer(name, stat, val);
              }
            });

            break;

          case "counters":
            stream.write(util.inspect(counters) + "\n");
            stream.write("END\n\n");
            break;

          case "timers":
            stream.write(util.inspect(timers) + "\n");
            stream.write("END\n\n");
            break;

          case "gauges":
            stream.write(util.inspect(gauges) + "\n");
            stream.write("END\n\n");
            break;

          case "delcounters":
            for (index in cmdline) {
              delete counters[cmdline[index]];
              stream.write("deleted: " + cmdline[index] + "\n");
            }
            stream.write("END\n\n");
            break;

          case "deltimers":
            for (index in cmdline) {
              delete timers[cmdline[index]];
              stream.write("deleted: " + cmdline[index] + "\n");
            }
            stream.write("END\n\n");
            break;

          case "delgauges":
            for (index in cmdline) {
              delete gauges[cmdline[index]];
              stream.write("deleted: " + cmdline[index] + "\n");
            }
            stream.write("END\n\n");
            break;

          case "quit":
            stream.end();
            break;

          default:
            stream.write("ERROR\n");
            break;
        }

      });
    });

    server.bind(config.port || 8125, config.address || undefined);
    mgmtServer.listen(config.mgmt_port || 8126, config.mgmt_address || undefined);

    util.log("server is up");

    pctThreshold = config.percentThreshold || 90;
    if (!Array.isArray(pctThreshold)) {
      pctThreshold = [ pctThreshold ]; // listify percentiles so single values work the same
    }

    flushInterval = Number(config.flushInterval || 10000);
    config.flushInterval = flushInterval;

    if (config.backends) {
      for (var i = 0; i < config.backends.length; i++) {
        loadBackend(config, config.backends[i]);
      }
    } else {
      // The default backend is graphite
      loadBackend(config, './backends/graphite');
    }

    // Setup the flush timer
    var flushInt = setInterval(flushMetrics, flushInterval);

    if (keyFlushInterval > 0) {
      var keyFlushPercent = Number((config.keyFlush && config.keyFlush.percent) || 100);
      var keyFlushLog = (config.keyFlush && config.keyFlush.log) || "stdout";

      keyFlushInt = setInterval(function () {
        var key;
        var sortedKeys = [];

        for (key in keyCounter) {
          sortedKeys.push([key, keyCounter[key]]);
        }

        sortedKeys.sort(function(a, b) { return b[1] - a[1]; });

        var logMessage = "";
        var timeString = (new Date()) + "";

        // only show the top "keyFlushPercent" keys
        for (var i = 0, e = sortedKeys.length * (keyFlushPercent / 100); i < e; i++) {
          logMessage += timeString + " count=" + sortedKeys[i][1] + " key=" + sortedKeys[i][0] + "\n";
        }

        var logFile = fs.createWriteStream(keyFlushLog, {flags: 'a+'});
        logFile.write(logMessage);
        logFile.end();

        // clear the counter
        keyCounter = {};
      }, keyFlushInterval);
    }


  ;

  }
}