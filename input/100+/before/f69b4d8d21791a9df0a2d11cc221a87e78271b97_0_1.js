function(root, stat, next) {
      var ext = path.extname(stat.name), text;
      if (ext === '.jade' || ext === '.ejs') {
        fs.readFile(path.join(root, stat.name), 'utf8', function(err, data) {
          if (err) throwError(err);
          var match;
          while( (match = regexCDN.exec(data)) ) {
            results.push(match[1]);
          }
          next();
        });
      }
    }