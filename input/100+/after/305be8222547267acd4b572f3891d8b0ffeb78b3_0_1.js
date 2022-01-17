function (argv) {
        var error = (typeof console === "undefined") ? print : console.error;
        var spec = this.spec;
        var opts = {};
        var argc = argv.length;
        var finished = 0;

        for (var i = 0; i < argc; i++) {
          var arg = argv[i];
          var match;

          if (arg.charAt(0) === "-" && finished > 0) {
            error("malformed options");
            return null;
          }

          if (arg.match(/^--.+=/)) {
            match = arg.match(/^--([^=]+)=(.*)/);
            if (!this.longs[match[1]]) {
              error("unknown option --" + match[1]);
              return null;
            }
            opts[match[1]] = match[2];
          } else if (arg.match(/^--.+/)) {
            match = arg.match(/^--(.+)/);
            if (!this.longs[match[1]]) {
              error("unknown option --" + match[1]);
              return null;
            }
            if (argv[i + 1] && argv[i + 1].charAt(0) !== "-") {
              opts[match[1]] = argv[i + 1];
              i++;
            } else {
              if (!opts[match[1]]) {
                opts[match[1]] = 1;
              }
              opts[match[1]]++;
            }
          } else if (arg.match(/^-[^-]+/)) {
            var sspec;
            match = arg.match(/^-(.+)/);
            if (sspec = this.shorts[match[1]]) {
              var optname = sspec.name ? sspec.name : match[1];
              if (sspec.countable) {
                if (!opts[optname]) {
                  opts[optname] = 1;
                } else {
                  opts[optname]++;
                }
              } else {
                if (argv[i + 1] && argv[i + 1].charAt(0) !== "-") {
                  opts[optname] = argv[i + 1];
                  i++;
                } else {
                  opts[optname] = true;
                }
              }
            } else {
              var letters = arg.slice(1).split('');
              for (var j = 0, k = letters.length; j < k; j++) {
                var sspec = this.shorts[letters[j]];
                if (!sspec) {
                  error("unknown option -" + letters[j]);
                  return null;
                }
                if (sspec.countable) {
                  if (!opts[sspec.name]) {
                    opts[sspec.name] = 1;
                  } else {
                    opts[sspec.name]++;
                  }
                } else {
                  opts[sspec.name] = true;
                }
              }
            }
          }
        }

        finished = i - 1;

        for (var i = 0, j = spec.length; i < j; i++) {
          var s = spec[i];
          if (!(s.name in opts)) {
            opts[s.name] = s.default;
          }
        }

        return { options: opts, rest: argv.slice(finished) };
      }