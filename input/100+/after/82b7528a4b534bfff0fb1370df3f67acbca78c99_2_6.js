function(doc, req) {
    var d = doc;
    d.title = 'Discriminator Zero';

    var rows = []
    for(var i=0; i<d.max_dac.length; i++) {
        t = {
            channel: i,
            max_rate: d.max_rate[i].toFixed(2),
            upper_rate: d.upper_rate[i].toFixed(2),
            lower_rate: d.lower_rate[i].toFixed(2),
            max_dac: d.max_dac[i],
            upper_dac: d.upper_dac[i],
            lower_dac: d.lower_dac[i],
            zero_dac: d.zero_dac[i],
            errors: d.errors[i],
        };
        rows.push(t);
    }

    d['rows'] = rows;

    return {
        title: d.title,
        content: templates.render('zdisc.html', req, d)
    };
}