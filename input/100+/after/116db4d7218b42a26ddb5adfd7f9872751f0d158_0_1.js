function validateComponent(req, beingCreated) {
  var body = req.body;
  var type = body.type;
  var action = body.action;

  if (!body.layout) {
    return 'Component must have a layout.';
  } else if (typeof body.layout.row !== 'number' ||
             typeof body.layout.col !== 'number') {
    return 'Component must have a numeric row and column.';
  } else if (typeof type !== 'string') {
    return 'Component must have a type.';
  } else if (type.length < 1 || type.length > 20) {
    return 'Component must have a type between 1 and 20 characters long.';
  } else if (action !== undefined && typeof action !== 'number') {
    return "Component's action must be a numeric id";
  }

  return true;
}