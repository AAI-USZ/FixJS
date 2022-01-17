function(value) {
        if (seed.type == 'double')
          value = parseFloat(value);
        
        Field.update_seed(seed, value);
      }