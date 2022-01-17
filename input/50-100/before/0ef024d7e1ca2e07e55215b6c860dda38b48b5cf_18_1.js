function(){
        label = this.monitor_resources;
        id_suffix=label.replace(/,/g,'_');
        id_suffix=id_suffix.replace(/\//g,'_');
        id = id_prefix+id_suffix;
        str+='<table class="info_table">\
                <thead><tr><th colspan="1">'+this.title+'</th></tr></thead>\
                <tr><td id="legend_'+id_suffix+'"></td></tr>\
                <tr><td style="border:0">\
                <div id="'+id+'" style="width:'+width+'px; height:150px;margin-bottom:10px;position:relative;left:-20px;">'+
                  spinner+
                '</div>\
              </td></tr></table>';
    }