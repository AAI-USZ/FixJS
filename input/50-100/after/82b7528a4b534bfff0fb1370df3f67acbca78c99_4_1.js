function(doc, req) {
    doc._deleted = true;

    var content = templates.render('test_deleted.html', req, {});

    if (!(req.client)) {
      content = templates.render('base.html', req, {
        content: content,
        title: 'Test deleted'
      });
      return [doc, content];
    }

    return [doc, {content: content, title: 'Test deleted'}];
}