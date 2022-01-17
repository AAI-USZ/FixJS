function() {
      var file, oldSelection, url;
      url = location.hash.replace('#/', '');
      file = app.files.query('url').is(url).end().pop();
      if (!file) {
        oldSelection = app.files.selected;
        app.files.selected = null;
        if (!oldSelection) {
          app.site.files.trigger('change:selected', app.site.files);
        }
        return app.currentFiles.selected = getDefaultFile(app.site);
      } else if (file.isFolder) {
        app.files.selected = file;
        return app.currentFiles.selected = getDefaultFile(file);
      } else {
        app.files.selected = file.parent;
        return app.currentFiles.selected = file;
      }
    }