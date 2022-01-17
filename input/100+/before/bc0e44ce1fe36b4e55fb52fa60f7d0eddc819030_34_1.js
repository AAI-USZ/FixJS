function() {
    var presets;

    setup(function() {
      presets = Object.keys(Calendar.Presets);
      subject._updateAccountPresets();
    });

    test('dom update', function() {
      var html = subject.accounts.innerHTML;

      assert.ok(html);

      presets.forEach(function(val) {
        assert.include(
          html,
          template.accountItem.render({ name: val })
        );
      });
    });
  }