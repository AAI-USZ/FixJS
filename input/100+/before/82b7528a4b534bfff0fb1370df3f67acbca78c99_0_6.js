function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var title = 'ECAL Results';
    var bad_tests = false;
    var bad_test_list = {};

    // first row is record
    var record = getRow().value;

    // subsequent are related tests
    var test;
    var tests = [];
    while (test = getRow()) {
        if (!test.value.config) {
            bad_tests = true;
            bad_test_list[test.value._id] = true;
        }
        tests.push({
            id: test.value._id,
            type: test.value.type,
            pass: test.value.pass,
            created: test.value.created,
            crate_id: test.value.config ? test.value.config.crate_id : "-",
            slot_id: test.value.config ? test.value.config.slot : "-"
        });
    }

    record.settings.scmos_ids = [];
    for (var j=0; j<record.settings.scmos.length; j++) {
       record.settings.scmos_ids.push(j);
    }

    var crate_id_to_index = {};
    for (var i=0; i<record.crates.length; i++) {
        crate_id_to_index[record.crates[i].crate_id] = i;
        var islot = 0;
        for (var j=0; j<16; j++) {
            if (record.crates[i].slots.length-1 < j) {
                record.crates[i].slots.push({slot_id: j, enabled: false});
            }
            else if (record.crates[i].slots[j].slot_id != j) {
                record.crates[i].slots.splice(j, 0, {slot_id: j, enabled: false});
            }
            else {
                record.crates[i].slots[j].enabled = true;
            }
            islot++;
        }
    }

    for (var j=0; j<tests.length; j++) {
        if (!(record.crates[crate_id_to_index[tests[j].crate_id]])) {
            bad_tests = true;
            bad_test_list[tests[j].id] = true;
            continue;
        }
        if (!(record.crates[crate_id_to_index[tests[j].crate_id]].slots[tests[j].slot_id].tests))
            record.crates[crate_id_to_index[tests[j].crate_id]].slots[tests[j].slot_id].tests = [tests[j]];
        else
            record.crates[crate_id_to_index[tests[j].crate_id]].slots[tests[j].slot_id].tests.push(tests[j]);
    }


    var content = templates.render("ecal.html", req, {
        record: record,
        bad_tests: bad_tests,
        bad_test_list: bad_test_list
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