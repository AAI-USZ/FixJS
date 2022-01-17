function(doc, req) {
    doc.title = 'FEC Test';
    return {
        title: doc.title,
        content: templates.render('fec_test.html', req, doc)
    };
}