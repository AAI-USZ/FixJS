function getShortcuts(shortcuts) {
      var max = pageHelper.getMaxPerPage();
      var list = [];

      var apps = Applications.getAll();
      for (var origin in apps) {
        if (shortcuts.indexOf(origin) === -1) {
          list.push(apps[origin]);
          if (list.length === max) {
            pageHelper.push(list);
            list = [];
          }
        }
      }

      if (list.length > 0) {
        pageHelper.push(list);
      }

      // Renders pagination bar
      updatePaginationBar();
      finish();

      // Saving initial state
      pageHelper.saveAll();
    }