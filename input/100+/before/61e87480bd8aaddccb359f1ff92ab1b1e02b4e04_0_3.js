function updateNdPlot(plot, toPlot, plotid, plotid_prefix, create) {
    var stage = 2;
    var plotdiv = document.getElementById(plotid_prefix);
    if (debug)
        console.log('plotid:', plotid, 'plotdiv:', plotdiv, plotid_prefix)
    
    if (!plot || !plot.hasOwnProperty("type") || plot.type!='nd'){
        stage = 1;
        plotdiv.innerHTML = ""
        var plot = { stage: 1, prevtype: null, targetId: plotid + '_target', series: [], options: { title: '', series: [{}], axes: {} }};
        plot.options.cursor = { show: true, zoom: true, tooltipFormatString: '%.3g, %.3g', tooltipLocation:'ne'};
        plot.options.series[0].markerOptions = {shadow: false};
        plot.options.series[0].shadow = false;
        plot.options.axes = {
          xaxis:{
            //label: data.xlabel,
            //labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
            tickRenderer: $.jqplot.CanvasAxisTickRenderer,
            tickOptions: {
                formatString: "%.2g"
            }
          },
          yaxis:{
            //label: data.ylabel,
            //labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
            tickRenderer: $.jqplot.CanvasAxisTickRenderer,
            tickOptions: {
                formatString: "%.2g",
                // fix for ticks drifting to the left in accordionview!
                _styles: {right: 0},
            }
          }
        }
        
        //plot.options.series = [{ renderer: jQuery.jqplot.errorbarRenderer, rendererOptions: { errorBar: true } }];
    }
    
    if (create) {
        plotdiv.appendChild(createNdPlotRegion(plotid));
        updateSeriesSelects(toPlot, plotid);
    }
    
    target_id = plotid + '_target';
    //var plotid = plot.targetId.substring(1 * (plot.targetId[0] == '#'), plot.targetId.length - 7);
    var series = plot.series;
    var options = plot.options;
    //var series = plot.series;
    //var options = plot.options;
    if (debug) console.log(100, plotid, toPlot);
    
    var quantityx = document.getElementById(plotid + '_selectx').value,
        quantityy = document.getElementById(plotid + '_selecty').value;
    if (debug) console.log(200, plotid+'_selectx', quantityx, quantityy);
    
    for (var s = 0; s < toPlot.series.length; s++) {
        // Prototype.js's Enumerable.zip() is handy here
        var datax = toPlot.series[s].data[quantityx],
            datay = toPlot.series[s].data[quantityy];
        if (debug) console.log(300, toPlot.series[s], quantityx, quantityy, datax, datay);
        // I know, I know: "series" is both singular and plural... go blame the English language, not me!
        //var serie = $A(datax.values).zip(datay.values, datax.errors, datay.errors, function(a) { return [a[0], a[1], { xerr: a[2], yerr: a[3] }]; });
        var serie = new Array();
        if (datax.values) {
            for (var i = 0; i < datax.values.length; i++) {
                serie[i] = [datax.values[i], datay.values[i], {xerr: get(datax.errors, i), yerr: get(datay.errors, i)}];
            }
        }
        if (debug) console.log('serie '+s, serie);
        if (!series[s] || !series[s].hasOwnProperty('data'))
            series[s] = serie;
        else
            series[s].data = serie;
        
        //options.series[s] = { renderer: jQuery.jqplot.errorbarRenderer, rendererOptions: { errorBar: true, /*bodyWidth: 1, wickColor: 'red', openColor: 'yellow', closeColor: 'blue'*/ } };
    }
    if (debug) console.log('series', series, 'options', options);
    
    if (stage == 1) {
        var empty = (series.length == 0);
        if (empty) {
            series = [[[0,0]]];
            options.series[0].show = false;
        }
        plot = jQuery.jqplot(target_id, series, options);
        plot.type = 'nd';
        if (empty) {
            options.series[0].show = true;
        }
        
    }
    else {
        plot.series.data = series;
        plot.options = options;
        plot.resetAxesScale();
        plot.replot();
    }
    return plot;
}