function addJs(filePath) {
      if (!namespace.javascriptFiles) {
        namespace.javascriptFiles = [];
      }

      var paths = [
        path.normalize(namespaceSourcePath + '/' + filePath),
        path.normalize(options.srcPath + '/' + filePath),
        path.normalize(filePath)
      ];

      var jsPath;
      for (var i = 0; i < paths.length; i++) {
        if (path.existsSync(paths[i])) {
          jsPath = paths[i];
          continue;
        }
      }

      if (jsPath === undefined) {
        throw new Error('Unable to find \'' + filePath + '\'');
      }

      namespace.javascriptFiles.push(jsPath);

      return namespace;
    }