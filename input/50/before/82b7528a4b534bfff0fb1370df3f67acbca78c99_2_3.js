function(doc, req) {
    return {
        title: 'Log Entry Deleted',
        content: templates.render('logbook_deleted.html', req, {})
    };
}