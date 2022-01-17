function() {
      setFixtures('<div class="in_field"><label for="email">Email</label><input id="email" type="text" /></div>');
      return [$('div.in_field', $('#jasmine-fixtures')), $('input', $('#jasmine-fixtures')), $('label', $('#jasmine-fixtures'))];
    }