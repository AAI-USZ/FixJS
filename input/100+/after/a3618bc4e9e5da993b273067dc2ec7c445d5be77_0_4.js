function(route) {
      var alreadyCached, buildPath, cacheFlags, css, data, ext, filename, mtime, source, sourcePath, startTime, stats, _i, _len, _ref, _ref1, _ref2, _ref3;
      if (!this.options.detectChanges && this.cachedRoutePaths[route]) {
        return this.cachedRoutePaths[route];
      }
      _ref = ['css'].concat((function() {
        var _results;
        _results = [];
        for (ext in cssCompilers) {
          _results.push(ext);
        }
        return _results;
      })());
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ext = _ref[_i];
        sourcePath = stripExt(route) + ("." + ext);
        try {
          stats = fs.statSync(this.absPath(sourcePath));
          if (ext === 'css') {
            if (timeEq(mtime, (_ref1 = this.cache.map[route]) != null ? _ref1.mtime : void 0)) {
              alreadyCached = true;
            } else {
              mtime = stats.mtime;
              css = (fs.readFileSync(this.absPath(sourcePath))).toString('utf8');
              css = this.fixCSSImagePaths(css);
            }
          } else {
            if (timeEq(stats.mtime, (_ref2 = this.cssSourceFiles[sourcePath]) != null ? _ref2.mtime : void 0)) {
              source = this.cssSourceFiles[sourcePath].data.toString('utf8');
            } else {
              data = fs.readFileSync(this.absPath(sourcePath));
              this.cssSourceFiles[sourcePath] = {
                data: data,
                mtime: stats.mtime
              };
              source = data.toString('utf8');
            }
            startTime = new Date;
            css = cssCompilers[ext].compileSync(this.absPath(sourcePath), source);
            if (css === ((_ref3 = this.compiledCss[sourcePath]) != null ? _ref3.data.toString('utf8') : void 0)) {
              alreadyCached = true;
            } else {
              mtime = new Date;
              this.compiledCss[sourcePath] = {
                data: new Buffer(css),
                mtime: mtime
              };
            }
          }
          if (alreadyCached && this.options.build) {
            filename = this.buildFilenames[sourcePath];
            return "/" + filename;
          } else if (alreadyCached) {
            return "/" + route;
          } else if (this.options.build) {
            filename = this.options.buildFilenamer(route, css);
            this.buildFilenames[sourcePath] = filename;
            cacheFlags = {
              expires: this.options.buildsExpire,
              mtime: mtime
            };
            this.cache.set(filename, css, cacheFlags);
            if (this.options.buildDir) {
              buildPath = path.join(process.cwd(), this.options.buildDir, filename);
              mkdirRecursive(path.dirname(buildPath), 0x1ed, function() {
                return fs.writeFile(buildPath, css);
              });
            }
            return this.cachedRoutePaths[route] = "/" + filename;
          } else {
            this.cache.set(route, css, {
              mtime: mtime
            });
            return this.cachedRoutePaths[route] = "/" + route;
          }
        } catch (e) {
          if (e.code === 'ENOENT') {
            continue;
          } else {
            throw e;
          }
        }
      }
      throw new Error("No file found for route " + route);
    }