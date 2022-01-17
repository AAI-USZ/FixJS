function() {
      var tpl = new Template(
        'z {a} foo'
      );

      assert.equal(tpl.render({a: 'baz'}), 'z baz foo');
      assert.equal(tpl.render({a: 'baz'}), 'z baz foo');
      assert.equal(tpl.render({a: 'baz'}), 'z baz foo');
    }