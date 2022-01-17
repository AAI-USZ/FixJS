function(options) {
    // Generates a protocol from the options and defaults to the one used by Geddy currently
    options = options || {};
    var protocol = options.protocol;

    // Set default protocol if none is given
    if(geddy.config.ssl) {
      protocol = protocol || 'https';
    } else protocol = protocol || 'http';

    // Remove slashes, etc.
    protocol = protocol.replace(/:\/*/, '');
    protocol += ':';

    // If it's a slashed protocol then add slashes
    if(utils.array.included(protocol.replace(/:\/*/, ''), this.slashedProtocols)) {
      if(protocol.replace(/:\/*/, '') === 'file') {
        protocol += '///';
      } else protocol += '//';
    }

    return protocol;
  }