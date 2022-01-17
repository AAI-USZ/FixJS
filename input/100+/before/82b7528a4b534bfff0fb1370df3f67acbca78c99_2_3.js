function(doc, req) {
    var d = doc;

    if (d.pass == false) {
        d.hints = [];
        for (var i=0; i<d.channels.length-3; i++) {
            if (i % 4 == 0 &&
                d.channels[i].errors &&
                d.channels[i+1].errors &&
                d.channels[i+2].errors &&
                d.channels[i+3].errors) {
                d.hints.push({issue: 'A block of 4 channels is broken', advice: 'The corresponding discriminator is probably dead.'});
            }
        }
    }

    return {
        title: 'Disc Check Test Results',
        content: templates.render('disc_check.html', req, d)
    };
}