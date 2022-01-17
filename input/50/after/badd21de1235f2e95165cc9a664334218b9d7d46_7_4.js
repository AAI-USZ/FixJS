function onAppsReady() {
      dirCtrl = getDirCtrl();
      HomeState.init(renderFromDB, renderFromMozApps);
      localize();
    }