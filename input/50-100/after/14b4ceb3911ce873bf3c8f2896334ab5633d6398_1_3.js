function GetFileNameWithoutExtension (path) {
      var index = Math.max(path.lastIndexOf("\\"), path.lastIndexOf("/"));
      if (index >= 0) {
        path = path.substr(index + 1);
      }

      index = path.indexOf(".");
      if (index >= 0)
        path = path.substr(0, index);

      return path;
    }