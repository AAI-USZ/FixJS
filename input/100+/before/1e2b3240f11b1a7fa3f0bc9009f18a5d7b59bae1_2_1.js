function( elem, name, value, pass ) {
  var type = elem.type;

  if (!elem || !isTag(elem))
    return undefined;

  if (!elem.attribs) {
    elem.attribs = {};
  }

  // Return the entire attribs object if no attribute specified
  if (!name) {
    return elem.attribs;
  }

  if (value !== undefined) {
    if (value === null) {
      // Remove the attribute
      $.removeAttr(elem, name);
    } else {
      // Set the attribute
      elem.attribs[name] = '' + value;
    }
  } else {
    // Get the attributes
    return elem.attribs[name];
  }
}