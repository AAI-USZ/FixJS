function() {
      var parent = Node();
      var prev = Node();
      var next = Node();
      var middle = Node();

      prev.adopt(parent, 0, 0);
      next.adopt(parent, prev, 0);
      middle.adopt(parent, prev, next);

      middle.disown();

      assert.equal(prev.next, next, 'prev.next is next');
      assert.equal(next.prev, prev, 'next.prev is prev');
      assert.equal(parent.firstChild, prev, 'parent.firstChild is prev');
      assert.equal(parent.lastChild, next, 'parent.lastChild is next');
    }