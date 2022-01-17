function validateScreen(req, beingCreated) {
  var title = req.body.title;

  /* TODO: validate is_start and layout */
  if (!title || title.length === 0) {
    return 'Screen must have a title.';
  } else if (title.length > 25) {
    return 'Screen must have a title less than 25 characters long.';
  }
  return true;
}