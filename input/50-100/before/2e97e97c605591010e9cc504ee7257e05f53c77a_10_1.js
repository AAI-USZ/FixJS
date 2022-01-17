function footer_onclick(event) {
    if (mode === 'normal') {
      var dataset = event.target.dataset;
      if (dataset && typeof dataset.origin !== 'undefined') {
        Applications.getByOrigin(dataset.origin).launch();
      }
    }
  }