function GetFileName (path) {
      var index = path.lastIndexOf("\\");
      if (index >= 0) {
        return path.substr(index + 1);
      }

      return path;
    }