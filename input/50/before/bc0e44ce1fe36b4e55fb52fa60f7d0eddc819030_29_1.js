function() {
        var tpl = new Template('foo bar');
        assert.equal(tpl.render(), 'foo bar');
      }