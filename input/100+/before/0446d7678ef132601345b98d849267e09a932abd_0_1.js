function plottingAPI(toPlots, plotid_prefix) {
    toPlots_input = toPlots;
    if (debug) console.log(toPlots.constructor.name);
    if (!(Array.isArray(toPlots))) {
        toPlots = [toPlots];
        if (debug)
            console.log('changing singleton data to length-1 array')

        // throw "Unsupported data format! Data must be a list of series.";
    }
// toPlots = $A(toPlots).flatten();
    
    if (debug)
        console.log('toPlots:', toPlots)
    // assuming all plots in the list are of the same type!
    plot_type = toPlots[0].type
    
    switch (plot_type) {
        case '2d':
            plot = update2dPlot(plot, toPlots, plotid_prefix);
            break;
        
        case '1d':
            plot = update1dPlot(plot, toPlots, plotid_prefix);
            break;
        
        case 'nd': 
             for (var i = 0; i < toPlots.length; i ++) {
                var toPlot = toPlots[i];
                var plotid = plotid_prefix + '_' + i;
                if (debug)
                    console.log('plotid:', plotid);
                
                plot = updateNdPlot(plot, toPlot, plotid, plotid_prefix, true);
                
                jQuery(document.getElementById(plotid + '_update')).unbind('click');
                jQuery(document.getElementById(plotid + '_update')).click({ 
                    plot: plot, 
                    toPlot: toPlot, 
                    plotid: plotid,
                    plotid_prefix: plotid_prefix
                    }, 
                    function(e) {
                        var plot = e.data.plot; 
                        var toPlot = e.data.toPlot;
                        var plotid = e.data.plotid;
                        var plotid_prefix = e.data.plotid_prefix;
                        plot = updateNdPlot(plot, toPlot, plotid, plotid_prefix);
                    });
            }
            break;
        
        default:
            alert('plotting of datatype "' + plot_type + '" is unsupported');
    }
}