function(doc, req) {
    doc.title = 'CGT Test';
    return {
        title: doc.title,
        content: templates.render('cgt_test.html', req, doc)
    };
}