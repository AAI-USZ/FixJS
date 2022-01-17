function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var list_template = "test_history.html";
    var title = "Test History";

    var row, rows = [];
    while (row = getRow()) {
        rows.push(row);
    }

    var content = templates.render(list_template, req, {
        rows: rows,
    });

    if (req.client) {
        $('#content').html(content);
        document.title = title;
        req.cookie = cookies.readBrowserCookies();
        document.cookies = cookies.readBrowserCookies();
    }
    else {
        return templates.render('base.html', req, {
            content: content,
            title: title
        });
    }
}