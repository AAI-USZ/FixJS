function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    // first row is board
    var board = getRow().value;

    if (board.board_type == 'Front-End Card') {
        board.board_type_short = 'fec';
    }
    if (board.board_type == 'Daughterboard') {
        board.board_type_short = 'db';
    }

    var title = board.board_type + ' ' + board._id;

    var s = board.status;
    board.status = {
        gold: s == 'gold',
        silver: s == 'silver', 
        bad: s == 'bad', 
        bone: s == 'bone', 
        none: s == 'none' 
    }; 

    var l = board.location;
    board.location = {
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
        if (req.client) console.log(row.key)
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
        else if (row.key[1] == 3) {
            var created = (doc.created ? (new Date(doc.created)).toString() : null);
            fec_docs.push({
                id: doc._id,
                created: created
            });
        }
        else if (doc.type == 'tag') {
            doc.board_name = doc.board;
            if (doc.setup.db0 || doc.setup.db1 || doc.setup.db2 || doc.setup.db3) {
                doc.showdbs = true;
            }

            var s = doc.status;
            doc.sdict = {
                gold: s == 'gold',
                silver: s == 'silver', 
                bad: s == 'bad', 
                bone: s == 'bone', 
                none: s == 'none' 
            };

            if ((new Date(doc.created) > last_tag_status_datetime) && doc.status && !(doc.status == 'none' || !doc.status)) {
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

    var content = templates.render("board.html", req, {
        board: board,
        final_tests: final_tests,
        ecals: ecals,
        fec_docs: fec_docs,
        tags: tags,
        tag_status: tag_status
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