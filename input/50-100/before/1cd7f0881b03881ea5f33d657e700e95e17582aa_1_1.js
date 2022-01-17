function(e) {
        var fileName;
        fileName = this.model.get("fileName");
        if (!(fileName != null)) {
          return menuOptions.saveAs.call(this, e);
        } else {
          return FileStorage.save(fileName, this.model.toJSON(false, true));
        }
      }