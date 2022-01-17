function bsm_winopen(evt) {
    if (evt.detail.features !== 'background')
      return;

    // preventDefault means "we're handling this popup; let it through."
    evt.preventDefault();
    // stopPropagation means we are not allowing
    // Popup Manager to handle this event
    evt.stopPropagation();

    // XXX: this is sad. Getting origin from manifest URL.
    var manifestURL = evt.target.getAttribute('mozapp');
    var origin = manifestURL.substr(0, manifestURL.indexOf('/'));

    var frame = open(origin, evt.detail.name, evt.detail.url);
    if (frame)
      evt.detail.frameElement = frame;
  }