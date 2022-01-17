function(doc, req) {
    return {
        title: 'Logbook Entry Saved',
        content: templates.render('logbook_saved.html', req, {})
    };
}