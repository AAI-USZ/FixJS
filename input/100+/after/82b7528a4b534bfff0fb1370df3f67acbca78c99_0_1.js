function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var listing_name;
    var listing_template = "listing.html";
    var type;
    var title;
    if (req.path[2] == 'fecs') {
        listing_name = "FECs";
        type = "fec";
    }
    if (req.path[2] == 'crates') {
        listing_name = "Crates";
        type = "crate";
    }
    if (req.path[2] == 'dbs') {
        listing_name = "Daughterboards";
        type = "db";
    }
    if (req.path[2] == 'tests') {
        listing_name = "Tests";
        type = "test";
    }
    title = 'All ' + listing_name;

    var rows = [];
    var row;
    while (row = getRow()) {
        var id = row.key;
        var count = row.value;
        var d = {'id': id, 'count': count, 'type': type};
        rows.push(d);
    }

    var content = templates.render(listing_template, req, {
        listing_name: listing_name,
        rows: rows,
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