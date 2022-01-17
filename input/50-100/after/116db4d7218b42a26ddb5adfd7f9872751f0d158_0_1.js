function getDefaultComponent(req) {
  var defaultComponent = {
    type: req.body.type,
    action: req.body.action
  };

  // be conservative when setting defaultComponent.layout to req.body.layout;
  // the latter may have more than just row and col
  if (req.body.layout) {
    defaultComponent.layout = {
      row: req.body.layout.row,
      col: req.body.layout.col
    };
  }

  return defaultComponent;
}