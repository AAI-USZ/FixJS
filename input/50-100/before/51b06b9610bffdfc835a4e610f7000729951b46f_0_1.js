function(filePath, line, column) {
        var _this = this;
        if (line == null) {
          line = 0;
        }
        if (column == null) {
          column = 0;
        }
        ide.dispatchEvent('openfile', {
          doc: ide.createDocument(require("ext/filesystem/filesystem").createFileNodeFromPath(filePath))
        });
        line = line - 1;
        return setTimeout((function() {
          return _this.startLiveCoffee(line);
        }), OPEN_FILE_TIMEOUT);
      }