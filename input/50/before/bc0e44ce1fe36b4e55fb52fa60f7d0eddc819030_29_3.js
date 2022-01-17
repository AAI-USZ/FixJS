function() {
        var tpl = new Template('foo {value}');
        assert.equal(tpl.render(), 'foo ');
      }