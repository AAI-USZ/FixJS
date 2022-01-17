function pg_render(apps, target) {
    this.container = target;
    var len = apps.length;

    this.olist = document.createElement('ol');
    for (var i = 0; i < len; i++) {
      var app = apps[i];
      if (typeof app === 'string') {
        // We receive an origin here else it's an app or icon
        app = Applications.getByOrigin(app);
      }

      // We have to check if the app is installed just in case
      // (DB could be corrupted)
      if (app) {
        this.append(app);
      }
    }
    target.appendChild(this.olist);
  }