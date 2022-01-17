function() {
        var tpl = new Template('\nfoo {value}');
        assert.equal(tpl.render('bar'), '\nfoo bar');
      }