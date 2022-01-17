function(doc, req) {
    return {
        title: 'New Log Entry',
        content: templates.render('logbook_new.html', req, {})
    };
}