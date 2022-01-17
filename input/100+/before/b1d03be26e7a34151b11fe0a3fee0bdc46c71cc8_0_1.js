function() {
      var parent = Node();
      var child = Node();

      debugger;
      child.adopt(parent, 0, 0);

      assert.equal(child.parent, parent, 'child.parent is set');
      assert.ok(!child[R], 'child has no next');
      assert.ok(!child[L], 'child has no prev');

      assert.equal(parent.ch[L], child, 'child is parent.ch[L]');
      assert.equal(parent.ch[R], child, 'child is parent.ch[R]');
    }