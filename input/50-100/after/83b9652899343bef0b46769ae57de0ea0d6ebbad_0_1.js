function getShortcuts(shortcuts) {
          var len = shortcuts.length;
          for (var i = 0; i < len; i++) {
            var origin = shortcuts[i];
            if (origin in installedApps) {
              delete installedApps[origin];
            }
          }

          for (var origin in installedApps) {
            GridManager.install(installedApps[origin]);
          }

          updatePaginationBar();
          finish();
        }