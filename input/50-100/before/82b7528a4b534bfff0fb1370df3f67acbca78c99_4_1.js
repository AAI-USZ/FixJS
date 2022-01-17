function(doc, req) {
    doc._deleted = true;
    if (req.client) {
      content = templates.render('test_deleted.html', req, {});
    }
    else {
      content = templates.render('base.html', req, {
        content: content,
        title: title
      });
    }
    return [doc, {content: content, title: 'Test deleted'}];
}