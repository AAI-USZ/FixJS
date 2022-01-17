f    start({code: 200, headers: {'Content-Type': 'text/html'}});

    // grab active locations from cookies for filtering
    var locations = {
        'penn': (req.cookie.penn == "true") ? true : false,
        'underground': (req.cookie.underground == "true") ? true : false,
        'surface': (req.cookie.surface == "true") ? true : false
    }

    // "system" is a FEC, DB, etc.
    var system_name;
    var system_id;
    var isaboard = true;
    var list_template = "index.html";
    var title = "SNO+ Electronics Debugging";
    if (req.query.startkey) {
        list_template = "test_list.html";
        if(req.query.startkey[1] == "{") {
            // match a crate and slot
            var r = req.query.startkey;
            r = r.toString().split(',');
            var crate = r[0].toString().substring(10);
            var slot = r[1].toString().substring(7, r[1].length-2);
            system_name = "Crate " + crate + ', Slot ' + slot;
            system_id = "";
        }
        else {
            system_id = req.query.startkey;
            system_id = system_id.toString().substring(1, system_id.length-1);
            if (req.path[2] == 'tests_by_fec')
                system_name = "FEC";
            if (req.path[2] == 'tests_by_crate'){
              isaboard = false;
                system_name = "Crate";
            }
            if (req.path[2] == 'tests_by_db')
                system_name = "Daughterboard";
            if (req.path[2] == 'tests_by_name'){
              isaboard = false;
              system_name = "Test";
            }
            title = 'Tests on ' + system_name + ' ' + system_id;
        }
    }
    var ee;
    if(req.query.summery == "true")
        ee = "true";

    var row, rows = [];
    var nrows = 0;
    while (row = getRow()) {
        // filter locations. not as good as filtering the view...
        //if (!locations[row.value.loc])
        //    continue;
        // limit index page to 10 most recent. also should be done on the view.
        if (list_template == "index.html" && nrows>10)
            break;
        nrows = nrows + 1;
        rows.push(row);
    }

    var content = templates.render(list_template, req, {
        rows: rows,
        isaboard: isaboard,
        system_name: system_name,
        system_id: system_id,
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
};
