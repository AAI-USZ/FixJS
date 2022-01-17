function validateProject(req, beingCreated) {
  var title = req.body.title;

  if (!title) {
    return 'Project must have a title.';
  } else if (title.length < 1 || title.length > 20) {
    return 'Project must have a title between 1 and 20 characters long.';
  }
  return true;
}