function() {
    it("should pluralize a model name", function() {
      expect(_('point').pluralize()).toEqual('points');
      expect(_('story').pluralize()).toEqual('stories');
    });

    it("should pass the skip option", function() {
      expect(_('foo').pluralize({skip: 'foo'})).toEqual('foo');
    });
  }