function(route) {
      var alreadyCached, buildPath, cacheFlags, filename, img, mtime, sourcePath, stats, _ref;
      if (!this.options.detectChanges && this.cachedRoutePaths[route]) {
        return this.cachedRoutePaths[route];
      }
      sourcePath = route;
      try {
        stats = fs.statSync(this.absPath(sourcePath));
        if (timeEq(mtime, (_ref = this.cache.map[route]) != null ? _ref.mtime : void 0)) {
          alreadyCached = true;
        } else {
          mtime = stats.mtime;
          img = fs.readFileSync(this.absPath(sourcePath));
        }
        if (alreadyCached && this.options.build) {
          filename = this.buildFilenames[sourcePath];
          return "/" + filename;
        } else if (alreadyCached) {
          return "/" + route;
        } else if (this.options.build) {
          filename = this.options.buildFilenamer(route, getExt(route));
          this.buildFilenames[sourcePath] = filename;
          cacheFlags = {
            expires: this.options.buildsExpire,
            mtime: mtime
          };
          this.cache.set(filename, img, cacheFlags);
          if (this.options.buildDir) {
            buildPath = path.join(process.cwd(), this.options.buildDir, filename);
            mkdirRecursive(path.dirname(buildPath), 0x1ed, function() {
              return fs.writeFile(buildPath, img);
            });
          }
          return this.cachedRoutePaths[route] = "/" + filename;
        } else {
          this.cache.set(route, img, {
            mtime: mtime
          });
          return this.cachedRoutePaths[route] = "/" + route;
        }
      } catch (e) {
        '';

      }
      throw new Error("No file found for route " + route);
    }