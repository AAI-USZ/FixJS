function assertTwoChildren(parent, one, two) {
      assert.equal(one.parent, parent, 'one.parent is set');
      assert.equal(two.parent, parent, 'two.parent is set');

      assert.ok(!one[L], 'one has no prev');
      assert.equal(one[R], two, 'one[R] is two');
      assert.equal(two[L], one, 'two[L] is one');
      assert.ok(!two[R], 'two has no next');

      assert.equal(parent.ch[L], one, 'parent.ch[L] is one');
      assert.equal(parent.ch[R], two, 'parent.ch[R] is two');
    }