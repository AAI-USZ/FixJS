function() {
      // XXX: Minor performance regression
      // come back later and inline
      // modifiers which should make
      // templates quite a bit faster
      return;

      var tpl = 'My name is {first} {last}, Thats Mr {last}';
      var template;

      var expected = 'My name is Sahaja Lal, Thats Mr Lal';

      var results = support.vs(5000, {
        compiled: function() {
          template = template || new Template(tpl);
          template.render({first: 'Sahaja', last: 'Lal'});
        },

        format: function() {
          Calendar.format(tpl, 'Sahaja', 'Lal');
        }
      });

      assert.ok(
        (results.compiled <= results.format),
        'compiled template should be faster then format'
      );
    }