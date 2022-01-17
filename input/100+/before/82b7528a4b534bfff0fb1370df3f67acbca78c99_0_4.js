function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var list_template = "ecal_history.html";
    var title = "ECAL History";

    var row, rows = [];
    while (row = getRow()) {
        var c = [];
        for (crate in row.value.crates) {
            c.push({
                crate_id: row.value.crates[crate].crate_id,
                mask: row.value.crates[crate].slot_mask
            });
        }
        row.crate_meta = c;
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