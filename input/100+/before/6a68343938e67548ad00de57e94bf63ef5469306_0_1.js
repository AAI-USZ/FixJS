function updateNdPlot(plot, toPlot, plotid, plotid_prefix, create) {
    if (create || !plot || !plot.hasOwnProperty("type") || plot.type!='nd'){
        var plotdiv = document.getElementById(plotid_prefix);
        plotdiv.innerHTML = "";  //removing the "I am a plot." from plotwindow.html's div
        myplotdiv = createNdPlotRegion(plotid);  //creates plot div
        myndgridpanel = makeNdPlotSelector(toPlot, plotid, plotid_prefix);  //creates gridpanel file selector
        
        myplotpanel = new Ext.panel.Panel({
            //height: 350,
            //width: 500,
            flex: 1,
            contentEl: myplotdiv,
        });
        
        new Ext.panel.Panel({
            layout: {
                type: 'hbox',
                padding: 10
            },
            frame: true,
            //height: 600,
            autoheight: true,
            width: 800,
            //autowidth: true,
            renderTo: plotid_prefix, //'plot'
            //defaults: { flex: 1 },
            items: [ myndgridpanel, {xtype: 'splitter', width: 15}, myplotpanel ]
            
        });
        toPlot = [toPlot[0]] //only doing the first file (set up so first file is only one checked in gridpanel)
        updateSeriesSelects(toPlot[0], plotid);
    } 

    target_id = plotid + '_target';
    series = new Array();

    var quantityx = document.getElementById(plotid + '_selectx').value,
        quantityy = document.getElementById(plotid + '_selecty').value;

    toPlotlength = toPlot.length;

    var data = {};
    data.data = series; //reference to series; CAUTION: be careful if changing this!!
    data.title = (toPlotlength > 0) ? toPlot[0].title : "Empty plot";
    data.options = {series: []}; // legend names/labels go in the 'series' option
    data.xlabel = quantityx;
    data.ylabel = quantityy;

    //recently added outer for - may not be necessary
    for (var p = 0; p < toPlotlength; ++p){
        toPlot_p = toPlot[p];
        for (var s = 0; s < toPlot_p.series.length; ++s) {
            // For TripleAxis plottables, this loop will only run once...  7/17/2012
            var datax = toPlot_p.series[s].data[quantityx],
                datay = toPlot_p.series[s].data[quantityy];
                filename = toPlot_p.series[s].label;

            // I know, I know: "series" is both singular and plural... 
            // go blame the English language, not me!
            // Prototype.js's Enumerable.zip() is handy here
            //var serie = $A(datax.values).zip(datay.values, datax.errors, datay.errors, function(a) { return [a[0], a[1], { xerr: a[2], yerr: a[3] }]; });

            // Following Ophir's 'serie/series' convention...
            var serie = new Array();
            if (datax.values) {
                for (var i = 0; i < datax.values.length; i++) {
                    var xerror = get(datax.errors, i) / 2.0;
                    var yerror = get(datay.errors, i) / 2.0;
                    
                    serie[i] = [datax.values[i], datay.values[i], {xerr: [xerror, xerror], yerr: [yerror, yerror]}];
                }
            } else {
                //if the file does not have plotable data for the selected axes, 
                //just plot the origin to avoid jqplot errors.
                serie = [[0,0]];
            }

            series.push(serie);

            //if the errorbars are toggled on, add the errorbarRenderer. Otherwise do not.
            data.options.series.push((errorbarsOn) ? {label: filename, renderer: $.jqplot.errorbarRenderer, rendererOptions: {errorBar: true}} : {label: filename});
            
            //data.options.series.push({label: filename, renderer: $.jqplot.errorbarRenderer, rendererOptions: {errorBar: true}});
        }
    }
    
    
    if (series.length == 0) {
        //if there are no files selected to plot, origin  and hide the legend.
        series = [[[0,0]]];  //NOTE: this works because data.data = series (by reference!)
        data.options.legend = {show: false};
    }

    var transform = 'none'; //For now, only setting to 'log' will set it. Defaults to linear
    plot = renderndplot(data, transform, target_id);
    return plot;
}