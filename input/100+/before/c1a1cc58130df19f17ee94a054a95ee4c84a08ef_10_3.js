function plot_graph(data,context,id_prefix,info){
    var labels = info.monitor_resources;
    var humanize = info.humanize_figures ?
        humanize_size : function(val){ return val };
    var id_suffix = labels.replace(/,/g,'_');
    id_suffix = id_suffix.replace(/\//g,'_');
    var labels_array = labels.split(',');
    var monitoring = data.monitoring
    var series = [];
    var serie;
    var mon_count = 0;

    //make sure series are painted in the order of the
    //labels array.
    for (var i=0; i<labels_array.length; i++) {
        serie = {
            label: labels_array[i],
            data: monitoring[labels_array[i]]
        };
        series.push(serie);
        mon_count++;
    };

    //Set options for the plots:
    // * Where the legend goes
    // * Axis options: print time and sizes correctly
    var options = {
        legend : { show : true,
                   noColumns: mon_count++,
                   container: $('#legend_'+id_suffix)
                 },
        xaxis : {
            tickFormatter: function(val,axis){
                return pretty_time_axis(val);
            },
        },
        yaxis : { labelWidth: 40,
                  tickFormatter: function(val, axis) {
                      return humanize(val);
                  },
                  min: 0
                }
    };

    id = id_prefix + id_suffix;
    $.plot($('#'+id, context),series,options); //call to flot lib
}