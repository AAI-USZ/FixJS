function(data) {
      var ref = "/hosts?search=facts."+data.name+"~~VAL1~"
      $("#"+div+"-body").attr('chart-href', ref);
      stat_pie(div+'-body', data.name, data.values,0);
    }