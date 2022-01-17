function(path) {
      var i, fileGuesses, file, code, fn;
      var oldRequireDir = requireDir;
      var module = { exports: {} };

      if (path === 'fs' || path === 'webpage' || path === 'webserver') {
        return phantomRequire(path);
      } else {
        if (path[0] === '.') {
          path = joinPath(requireDir, path);
        } else if (path[0] !== '/') {
          path = joinPath(nodifyPath, 'modules', path);
        }
        path = fs.absolute(path);
        
        if (path in requireCache) {
          return requireCache[path].exports;
        }
        
        fileGuesses = [
          path,
          path + '.js',
          path + '.coffee',
          joinPath(path, 'index.js'),
          joinPath(path, 'index.coffee'),
          joinPath(path, 'lib', basename(path) + '.js'),
          joinPath(path, 'lib', basename(path) + '.coffee')
        ];
        
        file = null;
        for (i = 0; i < fileGuesses.length && !file; ++i) {
          if (fs.isFile(fileGuesses[i])) {
            file = fileGuesses[i];
          }
        };
        if (!file) {
          throw new Error("Can't find module " + path);
        }
        requireDir = dirname(file);
        
        code = fs.read(file);
        if (file.match(/\.coffee$/)) {
          try {
            code = CoffeeScript.compile(code);
          } catch(e) {
            e.fileName = file;
            throw e;
          }
        }
        // a trick to associate Error's sourceId with file
        code += ";throw new Error('__sourceId__');";
        try {
          fn = new Function('module', 'exports', code);
          fn(module, module.exports);
        } catch(e) {
          //console.log(e.sourceId + ':' + file);
          if (!sourceIds.hasOwnProperty(e.sourceId)) {
            sourceIds[e.sourceId] = file;
          }
          if (e.message !== '__sourceId__') {
            throw e;
          }
        }
        
        requireDir = oldRequireDir;
        requireCache[path] = module;
        
        return module.exports;
      }
    }