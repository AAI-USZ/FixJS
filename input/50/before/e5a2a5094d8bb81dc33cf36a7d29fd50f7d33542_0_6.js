function(seed, name) {
      var control = Text_Field.create({
        name: name,
        owner: seed
      });
      
      return control;
    }