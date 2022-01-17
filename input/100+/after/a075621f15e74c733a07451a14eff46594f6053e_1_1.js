function validateElement(req, beingCreated) {
  var body = req.body;
  var type = body.type;
  var nextId = body.nextId;
  var name = body.name;
  var required = body.required;
  var text = body.text;
  var level = body.level;

  // TODO: refactor these out to validation helpers
  // TODO: Should these be on both the client and server side? If so, how
  // should they be kept in sync?
  if (typeof type !== 'string') {
    return 'Element must have a type.';
  } else if (type.length < 1 || type.length > 20) {
    return "Element must have a type between 1 and 20 characters long.";
  } else if (nextId && typeof nextId !== 'number') {
    return "Element's nextId must be an integer.";
  } else if (required && typeof required !== 'boolean') {
    return "Element's required attribute must be a boolean.";
  }
  
  if (name !== undefined) {
    if (typeof name !== 'string') {
      return "Element's name must be a string.";
    } else if (name.length < 1 || name.length > 50) {
      return "Element's name must be between 1 and 50 characters long.";
    }
  }
  
  if (text !== undefined) {
    if (typeof text !== 'string') {
      return "Element's text must be a string.";
    } else if (text.length < 1 || text.length > 500) {
      return "Element's text must be between 1 and 500 characters long.";
    }
  }
  
  if (level !== undefined) {
    if (typeof level === 'string') {
      body.level = level = parseInt(level, 10);
    }

    if (typeof level !== 'number') {
      return "Element's level must be a number.";
    } else if (level < 1 || level > 6) {
      return "Element's level must be between 1 and 6.";
    }
  }

  return true;
}