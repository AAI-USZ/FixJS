function footer_onclick(event) {
    if (mode === 'normal') {
      var dataset = event.target.dataset;
      if (dataset && typeof dataset.origin !== 'undefined') {
        var app = Applications.getByOrigin(dataset.origin);
        if (dataset.entrypoint) {
          app.launch('#' + dataset.entrypoint);
        } else {
          app.launch();
        }
      }
    }
  }