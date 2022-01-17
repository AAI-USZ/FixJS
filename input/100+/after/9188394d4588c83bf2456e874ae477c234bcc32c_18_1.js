function() {
      var tpl, input, output;
      tpl = new Template('{one|bool=selected}');
      output = tpl.render({ one: true });
      assert.equal(output, 'selected');

      output = tpl.render({ one: false });
      assert.equal(output, '');
    }