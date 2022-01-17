function(seed, name, type) {
      var control = Text_Field.create({
        name: name,
        owner: seed,
        type: type
      });
      
      return control;
    }