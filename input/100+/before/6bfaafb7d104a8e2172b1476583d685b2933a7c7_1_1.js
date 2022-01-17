function (dirPath) {
        var dir = path.normalize(dirPath)
          , paths = []
          , ret = [dir];
        paths = fs.readdirSync(dir);
        paths.forEach(function (p) {
          var curr = path.join(dir, p);
          var stat = fs.statSync(curr);
          if (stat.isDirectory()) {
            ret = ret.concat(_readDir(curr));
          }
          else {
            ret.push(curr);
          }
        });
        return ret;
      }