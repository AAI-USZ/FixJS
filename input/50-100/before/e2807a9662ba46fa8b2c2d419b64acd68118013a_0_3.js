function(seed, names) {      
      this.empty();
      
      for (var name in names) {
        if (seed.hasOwnProperty(name)) {
          var control = this.create_control(seed, name, names[name]);
          this.connect(control, 'child', 'parent');          
        }
      }
    }