function(doc, req) {
    return {
        title: 'See Reflections Test Results',
        content: templates.render('see_refl.html', req, doc)
    };
}