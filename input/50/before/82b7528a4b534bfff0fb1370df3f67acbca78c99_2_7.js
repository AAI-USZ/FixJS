function(doc, req) {
    return {
        title: 'FIFO Test Results',
        content: templates.render('fifo_test.html', req, doc)
    };
}