function(def, file){
      filePath = path.relative(baseDir, file);
      filePath = filePath.replace('\\', '/');
      imagesDef[filePath] = def;
    }