function validateProject(req, beingCreated) {
  var title = req.body.title;

  if (!title || title.length === 0) {
    return 'Project must have a title.';
  } else if (title.length > 25) {
    return 'Project must have a title less than 25 characters long.';
  }
  return true;
}