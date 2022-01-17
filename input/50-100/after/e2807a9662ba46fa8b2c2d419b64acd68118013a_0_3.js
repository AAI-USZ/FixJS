function(seed, names) {      
      this.empty();
      
      for (var name in names) {
        if (Meta_Object.has_property(seed, name)) {
          var control = this.create_control(seed, name, names[name]);
          this.connect(control, 'child', 'parent');          
        }
      }
    }