function() {
      var seed = this.seed;
      var name = seed.name;
      var html = '<li><label for="' + name + '">' + Field.pretty_name(name) + '</label><input type="text" name="' + name + '"/></li>';
      this.element = $(html);
      var input = this.element.find('input');      
      input.val(seed.owner[name]);      
      input.focus(function() {
        input.select();
      });
      Bloom.watch_input(input, function(value) {
        Field.update_seed(seed, value);
      });
      
      this.input = input;
    }