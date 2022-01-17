function(ev, name){
        var name;
        name == null && (name = file);
        name = (function(){
          return this.join(this.dirname(file), this.basename(name));
        }.call(path));
        return cb(__this.load.sync(__this, name));
      }