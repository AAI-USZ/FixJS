function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var board_name;

    if (req.query.startkey) {
        board_name = req.query.startkey.toString();
        if (board_name.substr(0,1) == "\"") {
            board_name = board_name.toString().substring(1,board_name.length-1);
        }
    }

    var title = 'Tags for board ' + board_name;

    var current_status = "None";
    var status_set = false;

    var row, rows = [];
    while (row = getRow()) {
        if (row.value.status != null && row.value.status != "none"){
            if (!status_set){
                status_set = true;
                current_status = row.value.status;
            }
            row.showstatus = true;
        }

        if (row.value.setup.mb.toString().length == 4 ||
          row.value.setup.db0.toString().length == 4 ||
          row.value.setup.db1.toString().length == 4 ||
          row.value.setup.db2.toString().length == 4 || 
          row.value.setup.db3.toString().length == 4) {
            row.showsetup = true;
        }

        if (row.value.author.toString().length > 0) {
          row.showauthor = true;
        }

        rows.push(row);
    }

    var content = templates.render("tag_list.html", req, {
        rows: rows,
        board_name: board_name,
        current_status: current_status,
        req: req,
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