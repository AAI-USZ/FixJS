function parseShadow(shadow) {
    if (shadow) {
      // Allow a shadow property string (eg. "0 0 4px #000")
      if (typeof shadow === 'string') {
        var segments = shadow.split(' ');
        shadow = { };
        shadow.left    = segments.shift();
        shadow.top     = segments.shift();
        shadow.radius  = segments.shift();
        shadow.color   = segments.join(' ');
      }
      // If the shadow was not given as a string or object, assume it
      // was boolean true (for backward compat) and default to an empty object
      shadow = (typeof shadow === 'object') ? shadow : { };
      // Default any ungiven shadow values
      shadow = merge(shadow, {
        top: '0',
        left: '0',
        radius: '4px',
        color: '#000'
      });
      // Build the final shadow string
      shadow.string = [shadow.left, shadow.top, shadow.radius, shadow.color].join(' ');
    }
    return shadow;
  }