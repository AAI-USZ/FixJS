function validateComponent(req, beingCreated) {
  var body = req.body;
  var type = body.type;
  var layout = body.layout;
  var action = body.action;

  if (!layout) {
    return 'Component must have a layout.';
  } else if (typeof layout.row !== 'number' ||
             typeof layout.col !== 'number') {
    return 'Component must have a numeric row and column.';
  } else if (typeof type !== 'string') {
    return 'Component must have a type.';
  } else if (type.length < 1 || type.length > 20) {
    return 'Component must have a type between 1 and 20 characters long.';
  }
  
  if (action !== undefined) {
    if (typeof action === 'string') {
      body.action = action = parseInt(action, 10);
    }

    if (typeof action !== 'number') {
      return "Component's action must be a numeric id";
    }
  }

  return true;
}