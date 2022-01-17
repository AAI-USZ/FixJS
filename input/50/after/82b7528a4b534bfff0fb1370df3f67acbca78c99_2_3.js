function(doc, req) {
    return {
        title: 'Logbook Entry Deleted',
        content: templates.render('logbook_deleted.html', req, {})
    };
}