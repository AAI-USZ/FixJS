function plot_global_graph(data,info){
    var context = $('#historical_table',main_tabs_context);
    var id = info.title;
    var monitoring = data.monitoring;
    var serie;
    var series = [];
    var width = ($(window).width()-129)*48/100;
    var mon_count = 0;
    var labels_array = info.monitor_resources.split(',');

    $('#'+id,context).html('<div id="'+id+'_graph" style="height:70px;width:'+width+'px;margin-bottom:10px;"><div>');

    for (var i=0; i<labels_array.length; i++) {
        serie = {
            label: tr(labels_array[i]),
            data: monitoring[labels_array[i]]
        };
        series.push(serie);
        mon_count++;
    };

    var options = {
        legend : {
            show : true,
            noColumns: mon_count,
            container: $('#'+id+'_legend')
        },
        xaxis : {
            tickFormatter: function(val,axis){
                return pretty_time_axis(val);
            },
        },
        yaxis : { labelWidth: 20 }
    }

    switch (id){
    case "graph2":
    case "graph4":
        options["yaxis"]["tickFormatter"] = function(val,axis) {
            return humanize_size(val);
        }
    }

    $.plot($('#'+id+'_graph',context),series,options);
}