function() {
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
    }