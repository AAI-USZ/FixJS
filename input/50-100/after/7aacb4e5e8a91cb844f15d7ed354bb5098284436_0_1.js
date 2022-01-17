function(msg) {
      var lineNumber = contents.substring(0, index).split('\n').length;
      var line = contents.split('\n')[lineNumber - 1];
      var info = "line "+lineNumber+", file "+source_name + "\n" + line;
      return new Error((msg || "Parse error")+" - "+info);
    }