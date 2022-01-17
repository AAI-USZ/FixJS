function submit() {
      if (settings) {
        for (var i = 0; i < fields.length; i++) {
          var input = fields[i];
          var cset = {};
          cset[input.dataset.setting] = input.value;
          settings.getLock().set(cset);
        }
      }
      return close();
    }