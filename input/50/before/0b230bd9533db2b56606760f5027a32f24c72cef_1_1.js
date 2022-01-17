function getDefaultScreen(req) {
  return {
    title: req.body.title,
    is_start: req.body.is_start,
    layout: req.body.layout
  };
}