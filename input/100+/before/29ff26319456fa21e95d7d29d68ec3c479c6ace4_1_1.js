function validateElement(req, beingCreated) {
  var body = req.body;
  var type = body.type;
  var level = body.level;

  // TODO: validation for every field
  if (typeof type !== 'string' || type.length === 0) {
    return 'Component must have a type.';
  }

  if (level && typeof level === 'string') {
    req.body.level = level = parseInt(level, 10);
  }

  if (level && (typeof level !== 'number' || level < 1 || level > 6)) {
    return 'Level must be an integer';
  }

  return true;
}