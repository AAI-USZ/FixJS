function pg_remove(app) {
    var icon = app;
    if ('ApplicationIcon' !== app.type) {
      // This is a moz app
      icon = this.icons[Applications.getOrigin(app)];
    }
    this.olist.removeChild(icon.container);
    delete this.icons[icon.descriptor.origin];
  }