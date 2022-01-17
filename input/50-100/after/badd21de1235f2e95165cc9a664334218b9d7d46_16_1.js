function bsm_winopen(evt) {
    if (evt.detail.features !== 'background')
      return;

    // preventDefault means "we're handling this popup; let it through."
    evt.preventDefault();
    // stopPropagation means we are not allowing
    // Popup Manager to handle this event
    evt.stopPropagation();

    var manifestURL = evt.target.getAttribute('mozapp');
    var origin = evt.target.dataset.frameOrigin;

    var detail = evt.detail;
    var opened = open(origin, detail.name, detail.url, detail.frameElement);
    if (!opened) {
      // Nullified unopened frame element.
      evt.detail.frameElement = null;
    }
  }