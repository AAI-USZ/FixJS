function(doc, req) {
   doc.title = 'Motherboard Stability Test';
    return {
        title: doc.title,
        content: templates.render('mb_stability_test.html', req, doc)
    };
}