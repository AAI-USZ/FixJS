function() {
    it('$inc - should increment numbers', function() {
      var c = new Collection()
        , item = {count: 7};

      c.execCommands('update', item, {count: {$inc: 7}});
      expect(item.count).to.equal(14);
      c.execCommands('update', item, {count: {$inc: -7}});
      expect(item.count).to.equal(7);
    });

    it('$push - should add an object to an array', function() {
      var c = new Collection()
        , item = {names: ['joe', 'bob']};

      c.execCommands('update', item, {names: {$push: 'sam'}});
      expect(item.names).to.eql(['joe', 'bob', 'sam']);
    });

    it('$pushAll - should add an array of objects to an array', function() {
      var c = new Collection()
        , item = {names: ['joe', 'bob']};

      c.execCommands('update', item, {names: {$pushAll: ['jim', 'sam']}});
      expect(item.names).to.eql(['joe', 'bob', 'jim', 'sam']);
    });

    it('should not throw', function() {
      var c = new Collection()
        , item = {names: 78};

      c.execCommands('update', item, {names: {$pushAll: ['jim', 'sam']}});
    });
  }