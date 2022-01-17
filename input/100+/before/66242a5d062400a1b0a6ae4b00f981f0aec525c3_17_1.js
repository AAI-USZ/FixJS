function() {
      var old;
      var lookup = {
        foo: 'FOO',
        bar: 'BAR',
        'field-one': 'first'
      };

      suiteSetup(function() {
        var old = navigator.mozL10n;
        navigator.mozL10n = {
          get: function(name) {
            return lookup[name];
          }
        };
      });

      suiteTeardown(function() {
        if (old) {
          navigator.mozL10n = old;
        }
      });

      test('prefix', function() {
        var tpl = new Template(
          '{start|l10n=field-} foo'
        );

        var result = tpl.render({
          'start': 'one'
        });

        assert.equal(result, 'first foo');
      });

      test('simple', function() {
        var tpl = new Template(
          '{one|l10n} {two|l10n}'
        );

        var result = tpl.render({
          one: 'foo',
          two: 'bar'
        });

        assert.equal(result, 'FOO BAR');
      });
    }