function(doc, req) {
    doc.title = 'FIFO Test';
    return {
        title: doc.title,
        content: templates.render('fifo_test.html', req, doc)
    };
}