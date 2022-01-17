function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var title = 'Debugging Log Book';

    var entry, entries = [];
    while (entry = getRow()) {
        entries.push({
            id: entry.value._id,
            created: entry.value.created,
            title: entry.value.title,
            clip: (entry.value.text.length < 50 ? entry.value.text : entry.value.text.substring(0,47) + '...')
        });
    }    

    var content = templates.render("logbook_list.html", req, {
        rows: entries
    });

    if (req.client) {
        $('#content').html(content);
        document.title = title;
    }
    else {
        return templates.render('base.html', req, {
            content: content,
            title: title
        });
    }
}