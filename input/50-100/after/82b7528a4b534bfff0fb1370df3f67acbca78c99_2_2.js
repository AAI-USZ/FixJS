function(doc, req) {
    var d = doc;
    d.title = 'Find Noise 2';
    for (idx in d.channels) {
        d.channels[idx].difference = d.channels[idx].noiseless - d.channels[idx].zero_used;
    }
    return {
        title: doc.title,
        content: templates.render('find_noise_2.html', req, doc)
    };
}