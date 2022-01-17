function(doc, req) {
    doc.title = 'See Reflections Test';
    return {
        title: doc.title,
        content: templates.render('see_refl.html', req, doc)
    };
}