function GetDirectoryName (path) {
      var index = path.lastIndexOf("\\");
      if (index >= 0) {
        return path.substr(0, index);
      }

      return "";
    }