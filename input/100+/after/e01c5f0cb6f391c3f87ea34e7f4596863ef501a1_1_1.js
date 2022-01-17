function() {
    it("should pluralize a model name", function() {
      expect(_('point').pluralize()).toEqual('points');
      expect(_('story').pluralize()).toEqual('stories');
    });

    it('should pass the skip option', function() {
      expect(_('foo').pluralize({skip: 'foo'})).toEqual('foo');
    });

    describe('when a number is provided', function() {
      it('should not pluralize when the number is 1', function() {
        expect(_('foo').pluralize(0)).toEqual('foos');
        expect(_('foo').pluralize(1)).toEqual('foo');
        expect(_('foo').pluralize(2)).toEqual('foos');
      });

      it('should pass the skip option', function() {
        expect(_('foo').pluralize(2, {skip: 'bar'})).toEqual('foos');
        expect(_('foo').pluralize(2, {skip: 'foo'})).toEqual('foo');
      });
    });
  }