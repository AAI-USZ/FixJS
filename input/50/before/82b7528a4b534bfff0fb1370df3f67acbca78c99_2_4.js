function(doc, req) {
    return {
        title: 'FEC Test Results',
        content: templates.render('fec_test.html', req, doc)
    };
}