function validateScreen(req, beingCreated) {
  var title = req.body.title;

  // TODO: validate is_start and layout
  if (!title) {
    return 'Screen must have a title.';
  } else if (title.length < 1 || title.length > 20) {
    return 'Screen must have a title between 1 than 20 characters long.';
  }
  return true;
}