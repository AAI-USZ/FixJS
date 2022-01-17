function GetDirectoryName (path) {
      var index = Math.max(path.lastIndexOf("\\"), path.lastIndexOf("/"));
      if (index >= 0) {
        return path.substr(0, index);
      }

      return "";
    }