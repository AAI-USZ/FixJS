function patchRequire() {
    phantom.injectJs(joinPath(nodifyPath, 'coffee-script.js'));
    var phantomRequire = nodify.__orig__require = require;
    var requireDir = rootPath;
    var requireCache = {};
    
    require = function(path) {
      var i, dir, paths = [], fileGuesses = [], file, code, fn;
      var oldRequireDir = requireDir;
      var module = { exports: {} };

      if (path === 'fs' || path === 'webpage' || path === 'webserver') {
        return phantomRequire(path);
      } else {
        if (path[0] === '.') {
          paths.push(fs.absolute(joinPath(requireDir, path)));
        } else if (path[0] === '/') {
          paths.push(fs.absolute(path));
        } else {
          dir = requireDir;
          while (dir !== '') {
            paths.push(joinPath(dir, 'node_modules', path));
            dir = dirname(dir);
          }
          paths.push(joinPath(nodifyPath, 'modules', path));
        }
        
        for (i = 0; i < paths.length; ++i) {
          fileGuesses.push.apply(fileGuesses, [
            paths[i],
            paths[i] + '.js',
            paths[i] + '.coffee',
            joinPath(paths[i], 'index.js'),
            joinPath(paths[i], 'index.coffee'),
            joinPath(paths[i], 'lib', basename(paths[i]) + '.js'),
            joinPath(paths[i], 'lib', basename(paths[i]) + '.coffee')
          ]);
        };
        
        file = null;
        for (i = 0; i < fileGuesses.length && !file; ++i) {
          if (fs.isFile(fileGuesses[i])) {
            file = fileGuesses[i];
          }
        };
        if (!file) {
          throw new Error("Can't find module " + path);
        }
        
        if (file in requireCache) {
          return requireCache[file].exports;
        }

        requireDir = dirname(file);
        
        code = fs.read(file);
        if (file.match(/\.coffee$/)) {
          try {
            code = CoffeeScript.compile(code);
          } catch (e) {
            e.fileName = file;
            throw e;
          }
        }
        // a trick to associate Error's sourceId with file
        code += ";throw new Error('__sourceId__');";
        try {
          fn = new Function('module', 'exports', code);
          fn(module, module.exports);
        } catch (e) {
          //console.log(e.sourceId + ':' + file);
          if (!sourceIds.hasOwnProperty(e.sourceId)) {
            sourceIds[e.sourceId] = file;
          }
          if (e.message !== '__sourceId__') {
            throw e;
          }
        }
        
        requireDir = oldRequireDir;
        requireCache[file] = module;
        
        return module.exports;
      }
    };
  }