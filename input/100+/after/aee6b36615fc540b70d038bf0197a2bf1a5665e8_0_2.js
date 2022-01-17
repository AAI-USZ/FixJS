function() {
      var parent = Node();
      var one = Node();
      var two = Node();

      one.adopt(parent, 0, 0);
      two.adopt(parent, one, 0);

      one.disown();

      assertSingleChild(parent, two);

      assert.equal(one.parent, parent, 'one retains its parent');
      assert.equal(one.next, two, 'one retains its next');

      assert.throws(function() { one.disown(); },
                    'disown fails on a malformed tree');
    }