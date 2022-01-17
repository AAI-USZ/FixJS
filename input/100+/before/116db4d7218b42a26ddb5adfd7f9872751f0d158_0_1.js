function validateComponent(req, beingCreated) {
  var body = req.body;
  var type = body.type;

  if (!body.layout) {
    return 'Component must have a layout.';
  } else if (typeof body.layout.row !== 'number' ||
             typeof body.layout.col !== 'number') {
    return 'Component must have a numeric row and column.';
  } else if (typeof type !== 'string' || type.length === 0) {
    return 'Component must have a type.';
  }

  return true;
}