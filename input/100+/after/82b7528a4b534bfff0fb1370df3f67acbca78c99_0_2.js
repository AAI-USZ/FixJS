f    start({code: 200, headers: {'Content-Type': 'text/html'}});

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
            system_id = req.query.startkey.toString();
            if (system_id.substr(0,1) == '[') {
                system_id = system_id.toString().substring(1, system_id.length-1);
            }
            if (system_id.substr(0,1) == '\"') {
                system_id = system_id.substring(1, system_id.length-1);
            }
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
        // limit index page to 10 most recent. should be done on the view.
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
    }
    else {
        return templates.render('base.html', req, {
            content: content,
            title: title
        });
    }

    if (req.client && list_template == 'index.html') {
        database.getView('board_stats', {group_level: 1}, function(err, data) {
            var n = 0;
            var d = {}
            for (row in data.rows) {
                key = data.rows[row].key;
                key = (key == 'none' ? 'unknown' : key);
                n = n + data.rows[row].value;
                d[key] = data.rows[row].value;
            }
            for (key in d) {
                var pct = 100.0 * d[key] / n;
                $('#board-status-' + key).css('width', String(pct)+'%');
                if (pct > 3) {
                    $('#board-status-' + key).html(d[key]);
                }
            }
            $('#board-status-total').html(n);
        });

        database.getView('fec_stats', {group_level: 1}, function(err, data) {
            var n = 0;
            var d = {}
            for (row in data.rows) {
                key = data.rows[row].key;
                key = (key == 'none' ? 'unknown' : key);
                n = n + data.rows[row].value;
                d[key] = data.rows[row].value;
            }
            for (key in d) {
                var pct = 100.0 * d[key] / n;
                $('#fec-status-' + key).css('width', String(pct)+'%');
                if (pct > 3) {
                    $('#fec-status-' + key).html(d[key]);
                }
            }
            $('#fec-status-total').html(n);
        });

        database.getView('db_stats', {group_level: 1}, function(err, data) {
            var n = 0;
            var d = {}
            for (row in data.rows) {
                key = data.rows[row].key;
                key = (key == 'none' ? 'unknown' : key);
                n = n + data.rows[row].value;
                d[key] = data.rows[row].value;
            }
            for (key in d) {
                var pct = 100.0 * d[key] / n;
                $('#db-status-' + key).css('width', String(pct)+'%');
                if (pct > 3) {
                    $('#db-status-' + key).html(d[key]);
                }
            }
            $('#db-status-total').html(n);
        });

        database.getView('location_stats', {group_level: 1}, function(err, data) {
            var n = 0;
            var d = {}
            for (row in data.rows) {
                key = data.rows[row].key;
                key = (key == 'none' ? 'unknown' : key);
                n = n + data.rows[row].value;
                d[key] = data.rows[row].value;
            }
            for (key in d) {
                var pct = 100.0 * d[key] / n;
                $('#board-location-' + key).css('width', String(pct)+'%');
                if (pct > 3) {
                    $('#board-location-' + key).html(d[key]);
                }
            }
            $('#board-location-total').html(n);
        });
    }
};
