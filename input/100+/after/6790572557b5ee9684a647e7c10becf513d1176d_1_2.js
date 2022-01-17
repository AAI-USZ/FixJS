function get_pie_chart(div, url) {
  if($("#"+div).length == 0)
    {
      $('body').append('<div id="' + div + '" class="modal fade"></div>');
      $("#"+div).append('<div class="modal-header"><a href="#" class="close" data-dismiss="modal">&times;</a><h3>Fact Chart</h3></div>')
      .append('<div id="' + div + '-body" class="fact_chart modal-body">Loading ...</div>');
      $("#"+div).modal('show');
      $.getJSON(url, function(data) {
        var ref = "/hosts?search=facts." + data.name + "~~VAL1~";
        $("#"+div+"-body").attr('chart-href', ref);
        stat_pie(div+'-body', data.name, data.values,0);
      });
    } else {$("#"+div).modal('show');}
}