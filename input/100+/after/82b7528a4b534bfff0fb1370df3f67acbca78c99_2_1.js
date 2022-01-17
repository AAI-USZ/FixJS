function(doc, req) {
    var d = doc;
    d.title = 'CMOS M GTVALID Test';

    d.slot_error = false;
    if (d.slot_errors & 0x1) {
        d.slot_error = true;
        d['slot_error_hint'] = 'Bad ISETM values';
    }
    else if (d.slot_errors & 0x2) {
        d.slot_error = true;
        d['slot_error_hint'] = 'Bad channel(s)';
    }
    else {
        d['slot_error_hint'] = '';
    }

    for (channel in d.channels)
        if (d.channels[channel].gtvalid0) {
            d['channels'][channel]['gtvalid0'] = d['channels'][channel]['gtvalid0'].toFixed(1);
            d['channels'][channel]['gtvalid1'] = d['channels'][channel]['gtvalid1'].toFixed(1);
        }

    return {
        title: d.title,
        content: templates.render('cmos_m_gtvalid.html', req, d)
    };
}