function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var crate_id;
    var boards = {fecs:[], pmtics: []};
    for (var slot=0; slot<16; slot++) {
        boards.fecs.push({dbs: [], fec: {}});
        boards.pmtics.push({});
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

        if (row.key[1] == 'PMTIC') {
            var slot = parseInt(row.key[2])
            boards.pmtics[slot] = row.value;
            boards.pmtics[slot].slot = slot;
        }
        else if (row.key[1] == 'CTC')
            boards.ctc = row.value;
        else if (row.key[1] == 'Front-End Card') {
            var slot = parseInt(row.key[2])
            boards.fecs[slot].fec = row.value;
            boards.fecs[slot].fec.slot = slot;
        }
        else if (row.key[1] == 'Daughterboard') {
            var slot = parseInt(row.key[2])
            var db_slot = parseInt(row.key[3])
            boards.fecs[slot].dbs[db_slot] = row.value;
            boards.fecs[slot].dbs[db_slot].slot = db_slot;
        }
        else if (row.key[1] == 'XL3')
            boards.xl3 = row.value;
    }

    var title = 'Crate ' + crate_id;

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

    if (req.client) {
        // if possible, fill in debugging tag status
        // make a separate query to the tags_by_crate view, which collates tags
        // and boards to map tags to crates.
        var q = {
            group_level: 2,
            startkey: [crate_id],
            endkey: [crate_id, {}]
        }
        database.getView('tags_by_crate', q, function(err, data) {
            for (row in data.rows) {
                if (data.rows[row].value && 'crate' in data.rows[row].value) {
                    var board = data.rows[row].key[1];
                    var status = data.rows[row].value.status ? data.rows[row].value.status : 'none';
                    var tag = {
                        none: 'tag_unknown.png',
                        gold: 'tag_gold.png',
                        silver: 'tag_silver.png',
                        bad: 'tag_bad.png',
                        bone: 'tag_bone.png'
                    }[status];
                    $('#tag-' + board).attr('src', utils.getBaseURL() + '/static/images/' + tag);
                }
            }
        });
    }
}