function(doc, req) {
    return {
        title: 'New Logbook Entry',
        content: templates.render('logbook_new.html', req, {})
    };
}