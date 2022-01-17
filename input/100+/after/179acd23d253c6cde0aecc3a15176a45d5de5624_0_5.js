function() {
          var code, counter, d, detail, details, displace, i, internal, sorted, tmp, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m;
          details = this.global.details;
          for (_i = 0, _len = details.length; _i < _len; _i++) {
            detail = details[_i];
            internal = false;
            for (_j = 0, _len1 = details.length; _j < _len1; _j++) {
              d = details[_j];
              if (d !== detail) {
                if (detail.depends === d["class"]) {
                  internal = true;
                  break;
                }
              }
            }
            if (!internal) {
              detail.depends = null;
            }
          }
          sorted = [];
          counter = 0;
          while (i = details.length) {
            if (counter++ === 100) {
              throw new Error("Can't resolve dependency.");
            }
            tmp = [];
            while (i--) {
              detail = details[i];
              displace = false;
              if (detail.depends == null) {
                displace = true;
              } else {
                for (_k = 0, _len2 = sorted.length; _k < _len2; _k++) {
                  d = sorted[_k];
                  if (detail.depends === d["class"]) {
                    displace = true;
                    break;
                  }
                }
              }
              if (displace) {
                details.splice(i, 1);
                tmp.push(detail);
              }
            }
            tmp.reverse();
            sorted = sorted.concat(tmp);
          }
          details = sorted;
          code = '';
          if (opts.bare != null) {
            for (_l = 0, _len3 = details.length; _l < _len3; _l++) {
              detail = details[_l];
              code += detail.code;
            }
          } else {
            for (_m = 0, _len4 = details.length; _m < _len4; _m++) {
              detail = details[_m];
              code += "" + detail.code + "\n";
            }
          }
          return compile(code, opts, opts.join, this.next);
        }