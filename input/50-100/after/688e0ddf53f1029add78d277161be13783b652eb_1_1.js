function success(onUpgradeNeeded) {
    if (onUpgradeNeeded) {
      // First time the database is empty -> Dock by default
      var appsInDockByDef = ['browser', 'dialer', 'music', 'gallery'];
      var protocol = window.location.protocol;
      appsInDockByDef = appsInDockByDef.map(function mapApp(name) {
        return protocol + '//' + name + '.' + domain;
      });
      HomeState.saveShortcuts(appsInDockByDef, start, start);
    } else {
      start();
    }
  }