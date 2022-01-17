function submit() {
      if (settings) {
        var cset = {};
        for (var i = 0; i < fields.length; i++) {
          var input = fields[i];
          cset[input.dataset.setting] = input.value;
        }
        settings.getLock().set(cset);
      }
      return close();
    }