function(seed) {
      var flower = this.item_type.create(seed);
      this.connect(flower, 'child', 'parent');
    }