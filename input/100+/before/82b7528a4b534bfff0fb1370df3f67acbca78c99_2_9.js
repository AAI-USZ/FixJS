function(doc, req) {
    var d = doc;

    var flag_hints = ['Passed', 'bad Q pedestal channel', 'Wrong number of pedestals', 'Bad Q and wrong number of pedestals'];

    var channels = []
    for (var i=0; i<d.errors.length; i++) {
        channels.push({
            id: i,
            errors: d.errors[i],
            flag: d.error_flags[i],
            hint: flag_hints[d.error_flags[i]]
        });
    }

    var tables = [];

    for(var i=0; i<d.num.length; i++) {
        var table = []
        for(var j=0; j<d.num[i].length; j++) {
            table.push({
                channel: i,
                cell: j,
                errors: channels[i].errors,
                num: d.num[i][j].toFixed(1),
                qhl: d.qhl[i][j].toFixed(1),
                qhl_rms: d.qhl_rms[i][j].toFixed(1),
                qhs: d.qhs[i][j].toFixed(1),
                qhs_rms: d.qhs_rms[i][j].toFixed(1),
                qlx: d.qlx[i][j].toFixed(1),
                qlx_rms: d.qlx_rms[i][j].toFixed(1),
                tac: d.tac[i][j].toFixed(1),
                tac_rms: d.tac_rms[i][j].toFixed(1),
            });
        }
        tables.push(table);
    }

    d['channels'] = channels;
    d['tables'] = tables;

    return {
        title: 'Pedestal Run Results',
        content: templates.render('ped_run.html', req, d)
    };
}