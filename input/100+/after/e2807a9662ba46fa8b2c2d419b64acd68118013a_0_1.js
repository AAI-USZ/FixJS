function(child_name, seed) {
      if (seed !== undefined) {
        this.seed = seed;
      }
      
      if (typeof child_name != 'string') {
        child_name = 'child';
      }
      
      this.listen(this.seed, 'connect.' + child_name, function(item) {
        this.add_seed_child(item);
      });
      
      this.listen(this.seed, 'disconnect.' + child_name, function(item) {
        var children = this.get_connections('child');
        
        for (var x = 0; x < children.length; x++) {
          if (children[x].seed === item) {
            this.disconnect(children[x]);
            return;
          }
        }
      });
      
      var children = this.seed.get_connections(child_name);      
      this.populate(children);
    }