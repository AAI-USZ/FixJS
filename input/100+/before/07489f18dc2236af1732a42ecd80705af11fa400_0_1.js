function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var crate_id;
    var boards = {fecs:[], pmtics: []};
    for (var slot=0; slot<16; slot++) {
        var fec = {xid: slot, dbs: []};
        for (var db=0; db<4; db++) {
            fec.dbs.push({idx: db});
        }
        boards.fecs.push(fec);
    }

    var row;
    while (row = getRow()) {
        crate_id = parseInt(row.key[0]);
        row.value.location = {
            penn: 'penn',
            surface: 'surf',
            underground: 'ug',
            unknown: '?',
            other: 'other'
        }[row.value.location];
        if (row.key[1] == 'PMTIC')
            boards.pmtics[parseInt(row.key[2])] = row.value;
        else if (row.key[1] == 'CTC')
            boards.ctc = row.value;
        else if (row.key[1] == 'Front-End Card')
            boards.fecs[parseInt(row.key[2])].fec = row.value;
        else if (row.key[1] == 'Daughterboard')
            boards.fecs[parseInt(row.key[2])].dbs[parseInt(row.key[3])] = row.value;
        else if (row.key[1] == 'XL3')
            boards.xl3 = row.value;
    }

    var title = 'Crate ' + crate_id;

/*
    var s = board['status'];
    board['status'] = {
        gold: s == 'gold',
        silver: s == 'silver', 
        bad: s == 'bad', 
        bone: s == 'bone', 
        none: s == 'none' 
    }; 

    var l = board['location'];
    board['location'] = {
        unknown: l == 'unknown' || s == '' || !s,
        surface: l == 'surface', 
        underground: l == 'underground', 
        penn: l == 'penn',
        other: l == 'other' 
    }; 

    var final_tests = [];
    var ecals = [];
    var fec_docs = [];
    var tags = [];
    var last_tag_status_datetime = new Date(null);
    var tag_status = 'none';

    var row;
    while (row = getRow()) {
        var doc = row.value;
        if (doc.type == 'final_test') {
            final_tests.push({
                id: doc._id,
                pass: doc.pass,
                created: doc.created
            });
        }
        else if (doc.type == 'ecal') {
            var c = [];
            for (crate in doc.crates) {
                c.push({
                    crate_id: doc.crates[crate].crate_id,
                    mask: doc.crates[crate].slot_mask
                });
            }
            ecals.push({
                id: doc._id,
                archived: doc.archived,
                config: c,
                created: doc.created
            });
        }
        else if (doc.name == 'FEC') {
            fec_docs.push({
                id: doc._id,
                created: (new Date(doc.timestamp_generated)).toString()
            });
        }
        else if (doc.type == 'tag') {
            doc.board_name = doc.board;
            if ((new Date(doc.created) > last_tag_status_datetime) && doc.status) {
                tag_status = doc.status;
                last_tag_status_datetime = new Date(doc.created);
            }
            tags.push(doc);
        }
    }    

    // sort by date
    function date_sort(a, b) { return ((new Date(b.created)) - (new Date(a.created))); }
    final_tests.sort(date_sort);
    ecals.sort(date_sort);
    fec_docs.sort(date_sort);
    tags.sort(date_sort);
*/
    var content = templates.render("crater.html", req, {
        crate_id: crate_id,
        boards: boards,
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