function() {
      var seed = this.seed;
      var name = seed.name;
      
      var label = this.element.find('label');
      label.text(Field.pretty_name(name));
      label.attr('for', name);
      
      var input = this.element.find('input');
      input.attr('name', name);
      input.val(seed.owner.value(name));      
      input.focus(function() {
        input.select();
      });
      
      Bloom.watch_input(input, function(value) {
        if (seed.type == 'double')
          value = parseFloat(value);
        
        Field.update_seed(seed, value);
      });
      
      this.input = input;
    }