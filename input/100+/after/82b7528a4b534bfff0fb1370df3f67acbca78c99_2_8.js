function(doc, req) {
    var d = doc;
    d.title = 'Set Ttot';

    var flag_hints = ['Passed', 'Ttot too large for DAC', 'No TUB triggers at minimum Ttot']

    var chip_id = 0;
    for (row in d.chips) {
        d.chips[row]['id'] = chip_id;
        chip_id = chip_id + 1;
        if (row % 2 == 0)
            d.chips[row]['color'] = '#a0ffa0';
        else
            d.chips[row]['color'] = 'white';
        for (channel in d.chips[row]['channels']) {
            d.chips[row]['channels'][channel]['error'] = (d.chips[row]['channels'][channel].errors != 0);
            d.chips[row]['channels'][channel]['hint'] = flag_hints[d.chips[row]['channels'][channel].errors];
        }
    }
    return {
        title: d.title,
        content: templates.render('set_ttot.html', req, d)
    };
}