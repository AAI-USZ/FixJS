function(err, concatenation, changed) {
              var buildDir, buildPath, cacheFlags;
              if (err) throw err;
              if (changed) {
                filename = _this.options.buildFilenamer(route, concatenation);
                _this.buildFilenames[sourcePath] = filename;
                cacheFlags = {
                  expires: _this.options.buildsExpire
                };
                _this.cache.set(filename, concatenation, cacheFlags);
                if (buildDir = _this.options.buildDir) {
                  buildPath = path.join(process.cwd(), buildDir, filename);
                  return mkdirRecursive(path.dirname(buildPath), 0755, function(err) {
                    return fs.writeFile(buildPath, concatenation);
                  });
                }
              } else {
                return filename = _this.buildFilenames[sourcePath];
              }
            }