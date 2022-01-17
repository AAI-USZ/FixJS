function(state) {
  var state        = $('span#' + state + 'state :only-child').val();
  var cities         = city_mapper[state];

  var city_select = $('span#' + state + 'city select');
  var city_input = $('span#' + state + 'city input');

  if(cities) {
    city_select.html('');
    var cities_with_blank = [["",""]].concat(cities);
    $.each(cities_with_blank, function(pos,id_nm) {
      var opt = $(document.createElement('option'))
                .attr('value', id_nm[0])
                .html(id_nm[1]);
      city_select.append(opt);
    });
    city_select.prop("disabled", false).show();
    city_input.hide().prop("disabled", true);

  } else {
    city_input.prop("disabled", false).show();
    city_select.hide().prop("disabled", true);
  }

}