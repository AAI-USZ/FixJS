function(doc, req) {
    doc.title = 'CALD Test';
    return {
        title: doc.title,
        content: templates.render('cald_test.html', req, doc)
    };
}