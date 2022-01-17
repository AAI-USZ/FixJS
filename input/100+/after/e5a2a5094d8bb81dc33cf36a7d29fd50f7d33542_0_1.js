function(seed){
      var self = this;
      this.seed = seed;
      this.optimize_getter('children', 'child');
      // Catch it early
      if(!this.element) {
        throw Error('element is null!');  
      }
      
      this.empty();
      
      if (this.item_type) {
        var block = this.item_type.get_instance_property('block');
        if (block) {
          Block.load(this.item_type.get_instance_property('block'), function() {
            self.load();
          });
        }
        else {
          this.load();
        }
      }
    }