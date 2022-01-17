function(doc, req) {
    return {
        title: 'Log Entry Saved',
        content: templates.render('logbook_saved.html', req, {})
    };
}