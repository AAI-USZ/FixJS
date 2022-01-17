function init ( options ) {
    if ( options ) {
      $.extend( true, settings, options );
    }
    settings.defaultClassificationURI = settings.resource.context + '/services/pdc/' +
      settings.resource.component + '/default';
    if (settings.resource.node != null && settings.resource.node.length > 0) {
      settings.defaultClassificationURI += '?nodeId=' + settings.resource.node;
    }
    settings.classificationURI = settings.resource.context + '/services/pdc/' +
      settings.resource.component + '/' + settings.resource.content;
    settings.pdcURI = settings.resource.context + '/services/pdc/' + settings.resource.component;
    if (settings.resource.content != null && settings.resource.content.length > 0) {
      settings.pdcURI = settings.pdcURI + '?contentId=' + settings.resource.content;
    }
  }