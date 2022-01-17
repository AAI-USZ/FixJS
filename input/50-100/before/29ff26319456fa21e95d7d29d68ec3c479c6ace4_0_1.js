function getDefaultComponent(req) {
  return {
    type: req.body.type,
    layout: req.body.layout,
    action: req.body.action
  };
}