function(doc, req) {
    var d = doc;
    d.title = 'Get Ttot';

    var flag_hints = ['Passed', 'GTVALID time < target time', 'Lost peds when channel enabled']

    for (channel in d.channels) {
        d.channels[channel]['error'] = (d.channels[channel].errors != 0);
        d.channels[channel]['hint'] = flag_hints[d.channels[channel].errors];
    }
    return {
        title: d.title,
        content: templates.render('get_ttot.html', req, d)
    };
}