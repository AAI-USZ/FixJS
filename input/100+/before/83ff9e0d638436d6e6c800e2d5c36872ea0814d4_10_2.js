function generateMonitoringDivs(graphs, id_prefix){
    var str = "";
    //43% of the width of the screen minus
    //181px (left menu size)
    var width = ($(window).width()-181)*40/100;
    var id_suffix="";
    var label="";
    var id="";

    $.each(graphs,function(){
        label = this.monitor_resources;
        id_suffix=label.replace(/,/g,'_');
        id_suffix=id_suffix.replace(/\//g,'_');
        id = id_prefix+id_suffix;
        str+='<table class="info_table">\
                <thead><tr><th colspan="1">'+this.title+'</th></tr></thead>\
                <tr><td id="legend_'+id_suffix+'"></td></tr>\
                <tr><td style="border:0">\
                <div id="'+id+'" style="width:'+width+'px; height:150px;margin-bottom:10px;position:relative;left:0px;">'+
                  spinner+
                '</div>\
              </td></tr></table>';
    });

    return str;
}