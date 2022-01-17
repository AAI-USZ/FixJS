function(doc, req) {
    var d = doc;
    d.title = 'Crate CBAL';

    if (d.pass == false) {
        d.hints = [];
        for (i in d.channels) {
            if (d.channels[i].vbal_low == 225 || d.channels[i].vbal_high == 225) {
                d.hints.push({
                    issue: 'One of more channel set to 225',
                    advice: 'Could not bring the charges into balance. Check the pre- and post-balance ped_run to see if one of the charges is crazy.'
                });
            }
        }
    }

    return {
        title: d.title,
        content: templates.render('crate_cbal.html', req, d)
    };
}