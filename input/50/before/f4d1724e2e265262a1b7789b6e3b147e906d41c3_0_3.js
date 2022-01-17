function(e) {
        var file = e.target.files[0];
        
        this.model.set('name', file.fileName);
      }