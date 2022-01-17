function(doc, req) {
    return {
        title: 'Motherboard Stability Test Results',
        content: templates.render('mb_stability_test.html', req, doc)
    };
}