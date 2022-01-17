function(doc, req) {
    var d = doc;

    for (var i=0; i<d.channels.length; i++) {
        if (i%2 == 0) {
            d.channels[i].color = "#eee";
        }
        // calculate dac value to use to be above the noise, & delta from noise peak center
        d.channels[i].dac_delta = d.channels[i].points[d.channels[i].points.length-1].thresh_above_zero;
        d.channels[i].dac_setting = d.channels[i].zero_used + d.channels[i].dac_delta;
        var baseline_plot_data = [];
        var readout_plot_data = [];
        for (var j=0; j<d.channels[i].points.length; j++) {
            var x = d.channels[i].zero_used + d.channels[i].points[j].thresh_above_zero;
            baseline_plot_data.push({id: x, value: d.channels[i].points[j].base_noise});
            readout_plot_data.push({id: x, value: d.channels[i].points[j].readout_noise});
        }
        d.channels[i].baseline_noise_profile = baseline_plot_data;
        d.channels[i].readout_noise_profile = readout_plot_data;
    }

    return {
        title: 'Noise Finder Test Results',
        content: templates.render('find_noise.html', req, d)
    };
}