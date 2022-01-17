function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var listing_template = "boards.html";
    var title = "All boards";

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
            status = '<span style="font-size:16pt;">&#9760;</span>';
        }

        var d = {
            id: row.key,
            status: status,
            location: row.value[1],
            assigned: (row.value[2] != 20)
        };

        rows.push(d);
    }

    var content = templates.render(listing_template, req, {
        rows: rows
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