function(doc, req) {
    return {
        title: 'Memory Test Results',
        content: templates.render('mem_test.html', req, doc)
    };
}