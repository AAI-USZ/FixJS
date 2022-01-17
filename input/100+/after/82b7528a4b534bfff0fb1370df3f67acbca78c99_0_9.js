function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var listing_template = "all_tags_list.html";
    var title = "All tags by board";

    var rows = [];
    var row;
    while (row = getRow()) {
        var status = row.value[0];

        if (status == "bad") {
            status = '<span style="color:red"><b>bad</b></span>';
        }
        else if (status == "gold") {
            status = '<span style="color:gold"><b>gold</b></span>';
        }
        else if (status == "silver") {
            status = '<span style="color:silver"><b>silver</b></span>';
        }
        else if (status == "bone") {
            status = "<del>bone</del>";
        }

        rows.push({
            id: row.key,
            status: status,
            count: row.value[1]
        });
    }

    var content = templates.render(listing_template, req, {
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