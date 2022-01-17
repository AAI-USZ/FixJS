function (program) {
      if(program.linked) {
        this.program = program;
        for(var name in this.attributes) {
          this.attributes[name].location =
            (name in program.locations) ? program.locations[name] : null;
        }
      }
      return this;
    }