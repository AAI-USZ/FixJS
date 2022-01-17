function expand_chart(ref){
  var chart = $(ref)
  if (!chart.hasClass('statistics_pie')){
    chart = $(ref).children().children('.statistics_pie');
  }
  var modal_id = chart.attr('id')+'_modal';
  var title = chart.attr('chart-title');
  var data = $.parseJSON(chart.attr('chart-data'));
   if($("#"+modal_id).length == 0)
  {
    $('body').append('<div id="' + modal_id + '" class="modal fade"></div>');
    $("#"+modal_id).append('<div class="modal-header"><a href="#" class="close">×</a><h3> ' +title+ ' </h3></div>')
              .append('<div id="' + modal_id + '-body" class="fact_chart modal-body">Loading ...</div>');
    $("#"+modal_id).modal('show');
    stat_pie(modal_id+'-body', title, data, 0, false, false)
  } else {$("#"+modal_id).modal('show');}
}