function(req, res) {
    var projectId = req.params[0];
    var screenId = req.params[1];
    res.render('prototype', {
      pageId: 'prototype',
      projectId: projectId,
      screenId: screenId
    });
  }