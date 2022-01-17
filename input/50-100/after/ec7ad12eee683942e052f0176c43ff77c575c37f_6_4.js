function pg_append(app) {
    if (app.type && app.type === 'ApplicationIcon') {
      this.setReady(false);
      this.olist.appendChild(app.container);
      this.icons[app.descriptor.origin] = app;
      this.setReady(true);
    } else {
      // This is a moz app
      var icon = new Icon(app);
      icon.render(this.olist, this.container);
      this.icons[Applications.getOrigin(app)] = icon;
    }
  }