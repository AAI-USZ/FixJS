function() {

    function renderTests(method) {


      test('single placeholder no flag', function() {
        var tpl = new Template(
          'z {a} foo'
        );

        assert.equal(tpl[method]({a: 'baz'}), 'z baz foo');
        assert.equal(tpl[method]({a: 'baz'}), 'z baz foo');
        assert.equal(tpl[method]({a: 'baz'}), 'z baz foo');
      });

      test('when input is not an object', function() {
        var tpl = new Template('foo {value}!');
        var result = tpl.render(1);

        assert.equal(result, 'foo 1!');
      });

      test('without placeholders', function() {
        var tpl = new Template('foo bar');
        assert.equal(tpl.render(), 'foo bar');
      });

      test('multiple placeholders', function() {
        var tpl = new Template(
          '{2} ! {1}'
        );
        assert.equal(tpl[method]({1: '1', 2: '2'}), '2 ! 1');
      });

      test('keys with dashes', function() {
        var tpl = new Template(
          '{foo-bar}'
        );

        assert.equal(tpl.render({'foo-bar': 'fo'}), 'fo');
      });

      test('html escape', function() {
        var tpl, input, output;

        tpl = new Template(
          '{html}'
        );

        input = '<div class="foo">\'zomg\'</div>';
        output = tpl.render({html: input});

        assert.equal(
          output,
          '&lt;div class=&quot;foo&quot;&gt;&#x27;zomg&#x27;&lt;/div&gt;'
        );
      });

      test('without arguments', function() {
        var tpl = new Template('foo {value}');
        assert.equal(tpl.render(), 'foo ');
      });

      test('with newlines in tpl', function() {
        var tpl = new Template('\nfoo {value}');
        assert.equal(tpl.render('bar'), '\nfoo bar');
      });

      test('no html escape', function() {
        var tpl, input, output;

        tpl = new Template(
          '{html|s}'
        );

        input = '<div class="foo">\'zomg\'</div>';
        output = tpl.render({html: input});

        assert.equal(
          output,
          input
        );
      });

    }

    renderTests('render');

  }