function(e) {
        var file = this.fileInput.files[0];
        this.model.set('name', file.fileName);
      }