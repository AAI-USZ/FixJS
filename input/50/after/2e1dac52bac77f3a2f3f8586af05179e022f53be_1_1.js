function getDefaultScreen(req) {
  return {
    title: req.body.title,
    isStart: req.body.isStart,
    layout: req.body.layout
  };
}