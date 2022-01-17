function(name){
      var name;
      name == null && (name = this.file);
      return fs.readFile.sync(fs, name);
    }