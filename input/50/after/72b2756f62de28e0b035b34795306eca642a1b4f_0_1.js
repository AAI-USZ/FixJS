function(def, file){
      filePath = path.relative(baseDir, file);
      filePath = filePath.replace(/\\+/g, '/');
      imagesDef[filePath] = def;
    }