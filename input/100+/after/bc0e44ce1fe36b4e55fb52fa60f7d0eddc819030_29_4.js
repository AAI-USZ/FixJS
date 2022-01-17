function() {
        var tpl = new Template(
          '{start|l10n=field-} foo'
        );

        var result = tpl.render({
          'start': 'one'
        });

        assert.equal(result, 'first foo');
      }