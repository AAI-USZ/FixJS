function(doc, req) {
    var d = doc;
    if (!d.status)
      d.status = "None";

    return {
        title: 'Debugging Tag',
        content: templates.render('tags.html', req, d)
    };
}