function(doc, req) {
    return {
        title: 'CALD Test Results',
        content: templates.render('cald_test.html', req, doc)
    };
}