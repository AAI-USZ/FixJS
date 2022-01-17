function(name){
      var name;
      name == null && (name = this.file);
      delete require.cache[path.resolve(__dirname, name)];
      return require(name);
    }