function get(key) {
    var value = (Settings.get('background.configure.set') || Settings.get('configure.set'))[key];

    // use default options when testing. Otherwise, the custom config might break the tests
    if (options['test_mode']) value = options[key]

    var option = options[key];

    if (value instanceof Array) {
      var new_value = value[0];
      var plus_it = value[1];

      if (option instanceof Array) {
        if (new_value.startWith('[')) {
          try {
            new_value = eval(new_value);
          } catch (e) {
            new_value = [];
          }
        } else {
          new_value = [new_value];
        }
        // += or =
        option = plus_it ? option.concat(new_value) : new_value;
      } else if (option instanceof Object) {
        try {
          new_value = JSON.parse(new_value);
        } catch (e) {
          new_value = {};
        }

        if (plus_it) {
          for (var i in new_value) {
            option[i] = new_value[i];
          }
        } else {
          option = new_value;
        }
      } else {
        option = plus_it ? (option + new_value) : new_value;
      }
    }
    return option;
  }