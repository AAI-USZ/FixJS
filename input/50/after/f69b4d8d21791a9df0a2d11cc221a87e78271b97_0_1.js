function(err, data) {
          if (err) throwError(err);
          var match;
          while( (match = regexCDN.exec(data)) ) {
            results.push(match[1]);
          }
        }