function(file, paths, callback) {
          var data, i, pathname;
          paths.unshift(".");
          i = 0;
          while (i < paths.length) {
            try {
              pathname = path.join(paths[i], file);
              fs.statSync(pathname);
              break;
            } catch (e) {
              pathname = null;
            }
            i++;
          }
          if (!pathname) {
            throw new Error("File " + file + " not found");
          }
          data = fs.readFileSync(pathname, 'utf-8');
          return new less.Parser({
            paths: [path.dirname(pathname)].concat(paths),
            filename: pathname
          }).parse(data, function(e, root) {
            if (e) {
              less.writeError(e);
            }
            return callback(e, root);
          });
        }