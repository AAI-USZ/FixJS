function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var board_name;
    var list_template = "index.html";
    var title = "SNO+ Electronics Debugging";
    if (req.query.startkey) {
        list_template = "tag_list.html";
        board_name = req.query.startkey;
        board_name = board_name.toString().substring(1,board_name.length-1);
        title = 'Tags for board ' + board_name;
    }
    var ee;
    if(req.query.summery == "true")
        ee = "true";

    var row, rows = [];
    var nrows = 0;
    var current_status = "None";
    var status_set = 0;
    while (row = getRow()) {
        // filter locations. not as good as filtering the view...
        //if (!locations[row.value.loc])
        //    continue;
        // limit index page to 10 most recent. also should be done on the view.
        if (list_template == "index.html" && nrows>10)
            break;
        nrows = nrows + 1;
        if (row.value.status != null && row.value.status != "none"){
          if (status_set == 0){
            status_set = 1;
            current_status = row.value.status;
          }
          row.showstatus = true;
        }
        if (row.value.setup.mb.toString().length == 4 ||
            row.value.setup.db0.toString().length == 4 ||
            row.value.setup.db1.toString().length == 4 ||
            row.value.setup.db2.toString().length == 4 || 
            row.value.setup.db3.toString().length == 4)
          row.showsetup = true;
        if (row.value.author.toString().length > 0)
          row.showauthor = true;
        rows.push(row);
    }

    var content = templates.render(list_template, req, {
        rows: rows,
        board_name: board_name,
        current_status: current_status,
        req: req,
        ee: ee
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